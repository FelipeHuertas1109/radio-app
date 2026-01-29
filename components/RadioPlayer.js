import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Slider,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const STREAM_URL = 'https://radio.hqs.com.co:9004/stream';
const STORAGE_KEY = '@hqs_radio_settings';

const RadioPlayer = React.forwardRef(({ onShowAdmin }, ref) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [error, setError] = useState(null);
  const [buffering, setBuffering] = useState(false);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(STREAM_URL);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    loadSettings();
    configureAudioMode();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [sound]);

  const loadSettings = async () => {
    try {
      const savedVolume = await AsyncStorage.getItem(`${STORAGE_KEY}_volume`);
      const savedUrl = await AsyncStorage.getItem(`${STORAGE_KEY}_url`);
      
      if (savedVolume !== null) {
        setVolume(parseFloat(savedVolume));
      }
      if (savedUrl !== null) {
        setCurrentStreamUrl(savedUrl);
      }
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
      
      if (status.didJustFinish) {
        handleReconnect();
      }
    } else if (status.error) {
      setError(`Error de reproducción: ${status.error}`);
      setIsPlaying(false);
      handleReconnect();
    }
  };

  const handleReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        stopPlayback();
        setTimeout(() => {
          startPlayback();
        }, 1000);
      }
    }, 3000);
  };

  const startPlayback = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Detener reproducción anterior si existe
      if (sound) {
        await sound.unloadAsync();
      }

      // Crear nueva instancia de audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentStreamUrl },
        {
          shouldPlay: true,
          volume: volume,
          isLooping: false,
          isMuted: false,
        },
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
        'Error de Conexión',
        'No se pudo conectar a la transmisión. Verifica tu conexión a internet.',
        [{ text: 'Reintentar', onPress: startPlayback }, { text: 'OK' }]
      );
    }
  };

  const stopPlayback = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      setIsPlaying(false);
      setBuffering(false);
    } catch (e) {
      console.error('Error stopping playback:', e);
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await stopPlayback();
    } else {
      await startPlayback();
    }
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
    if (wasPlaying) {
      await stopPlayback();
    }
    setCurrentStreamUrl(newUrl);
    saveSettings('url', newUrl);
    
    if (wasPlaying) {
      setTimeout(() => {
        startPlayback();
      }, 500);
    }
  };

  // Exponer función para AdminPanel
  React.useImperativeHandle(ref, () => ({
    updateStreamUrl,
  }));

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>HQS Radio</Text>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={onShowAdmin}
          >
            <Text style={styles.adminButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Status */}
        <View style={styles.statusContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#3B82F6" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : buffering ? (
            <View style={styles.bufferingContainer}>
              <ActivityIndicator size="small" color="#3B82F6" />
              <Text style={styles.statusText}>Cargando...</Text>
            </View>
          ) : isPlaying ? (
            <View style={styles.playingContainer}>
              <View style={styles.pulseCircle} />
              <Text style={styles.statusText}>En Vivo</Text>
            </View>
          ) : (
            <Text style={styles.statusText}>Detenido</Text>
          )}
        </View>

        {/* Main Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={togglePlayback}
          disabled={isLoading}
        >
          <LinearGradient
            colors={isPlaying ? ['#EF4444', '#DC2626'] : ['#10B981', '#059669']}
            style={styles.playButtonGradient}
          >
            <Text style={styles.playButtonText}>
              {isPlaying ? '⏸' : '▶'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Volume Control */}
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabel}>Volumen</Text>
          <View style={styles.volumeControls}>
            <Text style={styles.volumeIcon}>🔇</Text>
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#3B82F6"
            />
            <Text style={styles.volumeIcon}>🔊</Text>
          </View>
          <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
        </View>

        {/* Stream Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Stream URL:</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {currentStreamUrl}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: width - 40,
    borderRadius: 20,
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  adminButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminButtonText: {
    fontSize: 20,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
    minHeight: 60,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#FEE2E2',
    textAlign: 'center',
  },
  bufferingContainer: {
    alignItems: 'center',
  },
  playingContainer: {
    alignItems: 'center',
  },
  pulseCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginBottom: 8,
  },
  playButton: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  playButtonGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    fontSize: 50,
    color: '#FFFFFF',
  },
  volumeContainer: {
    marginBottom: 30,
  },
  volumeLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: '600',
  },
  volumeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeIcon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  volumeSlider: {
    flex: 1,
    height: 40,
  },
  volumeValue: {
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 5,
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    padding: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#E5E7EB',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default RadioPlayer;

