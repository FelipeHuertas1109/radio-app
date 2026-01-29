import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { APP_CONFIG } from '../constants/Config';

/**
 * Componente del botón de play/pause principal
 */
export default function PlayButton({ isPlaying, isLoading, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      <LinearGradient
        colors={
          isPlaying
            ? [APP_CONFIG.colors.error, '#DC2626']
            : [APP_CONFIG.colors.success, '#059669']
        }
        style={styles.gradient}
      >
        <Text style={styles.icon}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  gradient: {
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
  icon: {
    fontSize: 50,
    color: '#FFFFFF',
  },
});

