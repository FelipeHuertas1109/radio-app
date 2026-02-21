import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../constants/Config';

const { width } = Dimensions.get('window');
const C = APP_CONFIG.colors;

const STREAM_URL = APP_CONFIG.defaultStreamUrl;
const STORAGE_KEY = APP_CONFIG.storage.key;

function EqualizerBars({ isActive }) {
  const bars = useRef(
    Array.from({ length: 5 }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (isActive) {
      bars.forEach((bar, i) => {
        const animate = () => {
          Animated.sequence([
            Animated.timing(bar, {
              toValue: 0.5 + Math.random() * 0.5,
              duration: 300 + Math.random() * 400,
              useNativeDriver: true,
            }),
            Animated.timing(bar, {
              toValue: 0.2 + Math.random() * 0.3,
              duration: 300 + Math.random() * 400,
              useNativeDriver: true,
            }),
          ]).start(() => {
            if (isActive) animate();
          });
        };
        setTimeout(() => animate(), i * 120);
      });
    } else {
      bars.forEach(bar => {
        Animated.timing(bar, {
          toValue: 0.15,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isActive]);

  return (
    <View style={eqStyles.container}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            eqStyles.bar,
            {
              transform: [{ scaleY: bar }],
              backgroundColor: i % 2 === 0 ? C.gold : C.amberGlow,
            },
          ]}
        />
      ))}
    </View>
  );
}

const eqStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    gap: 4,
  },
  bar: {
    width: 4,
    height: 32,
    borderRadius: 2,
  },
});

const RadioPlayer = React.forwardRef((_, ref) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [error, setError] = useState(null);
  const [buffering, setBuffering] = useState(false);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(STREAM_URL);
  const reconnectTimeoutRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadSettings();
    configureAudioMode();
    return () => {
      if (sound) sound.unloadAsync();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [sound]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 1200, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        ])
      ).start();
      Animated.timing(glowAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    } else {
      pulseAnim.stopAnimation();
      Animated.timing(pulseAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
      Animated.timing(glowAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start();
    }
  }, [isPlaying]);

  const loadSettings = async () => {
    try {
      const savedVolume = await AsyncStorage.getItem(`${STORAGE_KEY}_volume`);
      const savedUrl = await AsyncStorage.getItem(`${STORAGE_KEY}_url`);
      if (savedVolume !== null) setVolume(parseFloat(savedVolume));
      if (savedUrl !== null) setCurrentStreamUrl(savedUrl);
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  };

  const saveSettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(`${STORAGE_KEY}_${key}`, value.toString());
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  };

  const configureAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
    } catch (e) {
      console.error('Error configuring audio mode:', e);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setPlaybackStatus(status);
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setBuffering(status.isBuffering);
      if (status.didJustFinish) handleReconnect();
    } else if (status.error) {
      setError(`Error: ${status.error}`);
      setIsPlaying(false);
      handleReconnect();
    }
  };

  const handleReconnect = () => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    reconnectTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        stopPlayback();
        setTimeout(() => startPlayback(), 1000);
      }
    }, 3000);
  };

  const startPlayback = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentStreamUrl },
        { shouldPlay: true, volume, isLooping: false, isMuted: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setIsPlaying(true);
      setIsLoading(false);
    } catch (e) {
      console.error('Error starting playback:', e);
      setError(`Error al conectar: ${e.message}`);
      setIsLoading(false);
      setIsPlaying(false);
      Alert.alert(
        'Error de Conexion',
        'No se pudo conectar a la transmision. Verifica tu conexion a internet.',
        [{ text: 'Reintentar', onPress: startPlayback }, { text: 'OK' }]
      );
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      try { await sound.stopAsync(); } catch (_) {}
      try { await sound.unloadAsync(); } catch (_) {}
      setSound(null);
    }
    setIsPlaying(false);
    setBuffering(false);
  };

  const togglePlayback = async () => {
    if (isPlaying) await stopPlayback();
    else await startPlayback();
  };

  const handleVolumeChange = async (newVolume) => {
    setVolume(newVolume);
    saveSettings('volume', newVolume);
    if (sound) {
      try {
        await sound.setVolumeAsync(newVolume);
      } catch (e) {
        console.error('Error setting volume:', e);
      }
    }
  };

  const updateStreamUrl = async (newUrl) => {
    const wasPlaying = isPlaying;
    if (wasPlaying) await stopPlayback();
    setCurrentStreamUrl(newUrl);
    saveSettings('url', newUrl);
    if (wasPlaying) setTimeout(() => startPlayback(), 500);
  };

  React.useImperativeHandle(ref, () => ({ updateStreamUrl }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(42, 25, 15, 0.0)', 'rgba(30, 18, 10, 0.6)', 'rgba(26, 15, 10, 0.85)']}
        locations={[0, 0.3, 1]}
        style={styles.fullGradient}
      >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>La Voz del Llano</Text>
          </View>

          {/* Decorative divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerIcon}>♪</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Status */}
          <View style={styles.statusContainer}>
            {isLoading ? (
              <>
                <ActivityIndicator size="large" color={C.gold} />
                <Text style={styles.statusText}>Conectando...</Text>
              </>
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : buffering ? (
              <>
                <ActivityIndicator size="small" color={C.amberGlow} />
                <Text style={styles.statusText}>Cargando...</Text>
              </>
            ) : isPlaying ? (
              <>
                <EqualizerBars isActive={true} />
                <View style={styles.liveContainer}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>EN VIVO</Text>
                </View>
              </>
            ) : (
              <Text style={styles.statusTextIdle}>Presiona play para escuchar</Text>
            )}
          </View>

          {/* Play Button */}
          <View style={styles.playSection}>
            <Animated.View style={[styles.playGlowRing, {
              transform: [{ scale: pulseAnim }],
              opacity: glowAnim,
            }]} />
            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayback}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isPlaying ? [C.sunset4, C.sunset3] : [C.gold, C.amber]}
                style={styles.playButtonGradient}
              >
                <Text style={styles.playButtonText}>
                  {isPlaying ? '■' : '▶'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Volume */}
          <View style={styles.volumeContainer}>
            <View style={styles.volumeHeader}>
              <Text style={styles.volumeLabel}>Volumen</Text>
              <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
            </View>
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor={C.gold}
              maximumTrackTintColor={C.terraDark}
              thumbTintColor={C.goldLight}
            />
          </View>


          {/* Instruments deco */}
          <View style={styles.decoRow}>
            <Text style={styles.decoText}>♪  Arpa, Cuatro y Maracas  ♪</Text>
          </View>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: C.gold,
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowColor: 'rgba(218, 165, 32, 0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
  },
  dividerIcon: {
    color: C.gold,
    fontSize: 16,
    marginHorizontal: 12,
    opacity: 0.6,
  },
  statusContainer: {
    alignItems: 'center',
    minHeight: 65,
    justifyContent: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 15,
    color: C.creamSoft,
    fontWeight: '500',
    marginTop: 10,
  },
  statusTextIdle: {
    fontSize: 15,
    color: C.warmGray,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 13,
    color: C.errorSoft,
    textAlign: 'center',
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(218, 165, 32, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.gold,
    marginRight: 8,
  },
  liveText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.gold,
    letterSpacing: 2,
  },
  playSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    height: 130,
  },
  playGlowRing: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: 'rgba(218, 165, 32, 0.2)',
  },
  playButton: {
    shadowColor: C.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  playButtonGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 248, 231, 0.15)',
  },
  playButtonText: {
    fontSize: 38,
    color: C.bgDark,
    fontWeight: '900',
    marginLeft: 4,
  },
  volumeContainer: {
    marginBottom: 20,
  },
  volumeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  volumeLabel: {
    fontSize: 14,
    color: C.creamSoft,
    fontWeight: '600',
  },
  volumeValue: {
    fontSize: 14,
    color: C.gold,
    fontWeight: '600',
  },
  volumeSlider: {
    width: '100%',
    height: 40,
  },
  decoRow: {
    alignItems: 'center',
    marginTop: 4,
  },
  decoText: {
    fontSize: 12,
    color: C.warmGrayDark,
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
});

export default RadioPlayer;
