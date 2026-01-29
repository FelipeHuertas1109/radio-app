/**
 * Utilidades para almacenamiento local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../constants/Config';

const STORAGE_KEY = APP_CONFIG.storage.key;

/**
 * Guarda un valor en el almacenamiento local
 */
export const saveToStorage = async (key, value) => {
  try {
    const fullKey = `${STORAGE_KEY}_${key}`;
    await AsyncStorage.setItem(fullKey, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
    return false;
  }
};

/**
 * Obtiene un valor del almacenamiento local
 */
export const getFromStorage = async (key, defaultValue = null) => {
  try {
    const fullKey = `${STORAGE_KEY}_${key}`;
    const value = await AsyncStorage.getItem(fullKey);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from storage:`, error);
    return defaultValue;
  }
};

/**
 * Elimina un valor del almacenamiento local
 */
export const removeFromStorage = async (key) => {
  try {
    const fullKey = `${STORAGE_KEY}_${key}`;
    await AsyncStorage.removeItem(fullKey);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
    return false;
  }
};

/**
 * Limpia todo el almacenamiento de la app
 */
export const clearStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter(key => key.startsWith(STORAGE_KEY));
    await AsyncStorage.multiRemove(appKeys);
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

/**
 * Guarda la URL del stream actual
 */
export const saveStreamUrl = async (url) => {
  return await saveToStorage(APP_CONFIG.storage.urlKey, url);
};

/**
 * Obtiene la URL del stream actual
 */
export const getStreamUrl = async (defaultUrl) => {
  const url = await getFromStorage(APP_CONFIG.storage.urlKey);
  return url || defaultUrl;
};

/**
 * Guarda el volumen
 */
export const saveVolume = async (volume) => {
  return await saveToStorage(APP_CONFIG.storage.volumeKey, volume);
};

/**
 * Obtiene el volumen guardado
 */
export const getVolume = async (defaultVolume) => {
  const volume = await getFromStorage(APP_CONFIG.storage.volumeKey);
  return volume !== null ? volume : defaultVolume;
};

/**
 * Guarda los streams favoritos
 */
export const saveStreams = async (streams) => {
  return await saveToStorage(APP_CONFIG.storage.savedStreamsKey, streams);
};

/**
 * Obtiene los streams favoritos
 */
export const getStreams = async () => {
  return await getFromStorage(APP_CONFIG.storage.savedStreamsKey, []);
};

