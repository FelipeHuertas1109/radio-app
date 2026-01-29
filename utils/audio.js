/**
 * Utilidades para manejo de audio
 */
import { Audio } from 'expo-av';

/**
 * Configura el modo de audio para la aplicación
 */
export const configureAudioMode = async () => {
  try {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    return true;
  } catch (error) {
    console.error('Error configuring audio mode:', error);
    return false;
  }
};

/**
 * Crea una instancia de audio para reproducir un stream
 */
export const createAudioInstance = async (uri, options = {}) => {
  try {
    const defaultOptions = {
      shouldPlay: true,
      volume: 1.0,
      isLooping: false,
      isMuted: false,
      ...options,
    };

    const { sound } = await Audio.Sound.createAsync(
      { uri },
      defaultOptions
    );

    return { sound, error: null };
  } catch (error) {
    console.error('Error creating audio instance:', error);
    return { sound: null, error };
  }
};

/**
 * Formatea el tiempo de reproducción
 */
export const formatPlaybackTime = (milliseconds) => {
  if (!milliseconds || isNaN(milliseconds)) {
    return '00:00';
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Convierte un valor de volumen (0-1) a porcentaje (0-100)
 */
export const volumeToPercentage = (volume) => {
  return Math.round(volume * 100);
};

/**
 * Convierte un porcentaje (0-100) a valor de volumen (0-1)
 */
export const percentageToVolume = (percentage) => {
  return Math.max(0, Math.min(1, percentage / 100));
};

