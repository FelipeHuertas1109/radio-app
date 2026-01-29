/**
 * Configuración centralizada de la aplicación HQS Radio
 */

export const APP_CONFIG = {
  name: 'HQS Radio',
  version: '1.0.0',
  defaultStreamUrl: 'https://radio.hqs.com.co:9004/stream',
  colors: {
    primary: '#1E3A8A',
    primaryLight: '#3B82F6',
    primaryLighter: '#60A5FA',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    white: '#FFFFFF',
    gray: '#9CA3AF',
    grayLight: '#E5E7EB',
  },
  storage: {
    key: '@hqs_radio_settings',
    volumeKey: 'volume',
    urlKey: 'url',
    savedStreamsKey: 'saved_streams',
  },
  audio: {
    defaultVolume: 1.0,
    reconnectDelay: 3000,
    playbackTimeout: 10000,
  },
  ui: {
    splashScreenDelay: 2000,
    blurIntensity: 20,
  },
};

export default APP_CONFIG;

