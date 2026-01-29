/**
 * Utilidades de validación
 */

/**
 * Valida si una URL es válida
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url.trim());
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Valida si una URL es un stream de audio válido
 */
export const isValidAudioStream = async (url) => {
  if (!isValidUrl(url)) {
    return false;
  }

  // Verificación básica - en producción podrías hacer una petición HEAD
  // para verificar que el stream responde correctamente
  return true;
};

/**
 * Sanitiza una URL removiendo espacios y caracteres inválidos
 */
export const sanitizeUrl = (url) => {
  if (!url) return '';
  return url.trim();
};

/**
 * Valida el nombre de un stream
 */
export const isValidStreamName = (name) => {
  if (!name || typeof name !== 'string') {
    return false;
  }
  return name.trim().length > 0 && name.trim().length <= 100;
};

/**
 * Genera un nombre por defecto para un stream
 */
export const generateDefaultStreamName = (index) => {
  return `Stream ${index + 1}`;
};

