/**
 * Hook personalizado para manejar el reproductor de audio
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { configureAudioMode, createAudioInstance } from '../utils/audio';
import { getStreamUrl, getVolume, saveStreamUrl, saveVolume } from '../utils/storage';
import { APP_CONFIG } from '../constants/Config';

export const useAudioPlayer = (initialStreamUrl = null) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(APP_CONFIG.audio.defaultVolume);
  const [error, setError] = useState(null);
  const [buffering, setBuffering] = useState(false);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(
    initialStreamUrl || APP_CONFIG.defaultStreamUrl
  );
  const reconnectTimeoutRef = useRef(null);

  // Cargar configuración al iniciar
  useEffect(() => {
    loadSettings();
    configureAudioMode();

    return () => {
      cleanup();
    };
  }, []);

  // Limpiar recursos
  const cleanup = useCallback(async () => {
    if (sound) {
      try {
        await sound.unloadAsync();
      } catch (e) {
        console.error('Error unloading sound:', e);
      }
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
  }, [sound]);

  // Cargar configuración guardada
  const loadSettings = useCallback(async () => {
    try {
      const savedUrl = await getStreamUrl(APP_CONFIG.defaultStreamUrl);
      const savedVolume = await getVolume(APP_CONFIG.audio.defaultVolume);
      
      setCurrentStreamUrl(savedUrl);
      setVolume(savedVolume);
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  }, []);

  // Manejar actualizaciones de estado de reproducción
  const onPlaybackStatusUpdate = useCallback((status) => {
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
  }, []);

  // Manejar reconexión automática
  const handleReconnect = useCallback(() => {
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
    }, APP_CONFIG.audio.reconnectDelay);
  }, [isPlaying]);

  // Iniciar reproducción
  const startPlayback = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Detener reproducción anterior si existe
      if (sound) {
        await sound.unloadAsync();
      }

      // Crear nueva instancia de audio
      const { sound: newSound, error: audioError } = await createAudioInstance(
        currentStreamUrl,
        {
          shouldPlay: true,
          volume: volume,
          isLooping: false,
          isMuted: false,
        }
      );

      if (audioError || !newSound) {
        throw audioError || new Error('No se pudo crear la instancia de audio');
      }

      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setSound(newSound);
      setIsPlaying(true);
      setIsLoading(false);
    } catch (e) {
      console.error('Error starting playback:', e);
      setError(`Error al conectar: ${e.message}`);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [currentStreamUrl, volume, sound, onPlaybackStatusUpdate]);

  // Detener reproducción
  const stopPlayback = useCallback(async () => {
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
  }, [sound]);

  // Alternar reproducción
  const togglePlayback = useCallback(async () => {
    if (isPlaying) {
      await stopPlayback();
    } else {
      await startPlayback();
    }
  }, [isPlaying, startPlayback, stopPlayback]);

  // Cambiar volumen
  const changeVolume = useCallback(async (newVolume) => {
    setVolume(newVolume);
    await saveVolume(newVolume);
    
    if (sound) {
      try {
        await sound.setVolumeAsync(newVolume);
      } catch (e) {
        console.error('Error setting volume:', e);
      }
    }
  }, [sound]);

  // Actualizar URL del stream
  const updateStreamUrl = useCallback(async (newUrl) => {
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      await stopPlayback();
    }
    setCurrentStreamUrl(newUrl);
    await saveStreamUrl(newUrl);
    
    if (wasPlaying) {
      setTimeout(() => {
        startPlayback();
      }, 500);
    }
  }, [isPlaying, stopPlayback, startPlayback]);

  return {
    sound,
    isPlaying,
    isLoading,
    volume,
    error,
    buffering,
    currentStreamUrl,
    startPlayback,
    stopPlayback,
    togglePlayback,
    changeVolume,
    updateStreamUrl,
  };
};

