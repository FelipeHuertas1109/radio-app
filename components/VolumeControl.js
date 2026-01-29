import React from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { APP_CONFIG } from '../constants/Config';
import { volumeToPercentage } from '../utils/audio';

/**
 * Componente para controlar el volumen
 */
export default function VolumeControl({ volume, onVolumeChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Volumen</Text>
      <View style={styles.controls}>
        <Text style={styles.icon}>🔇</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={onVolumeChange}
          minimumTrackTintColor={APP_CONFIG.colors.primaryLight}
          maximumTrackTintColor={APP_CONFIG.colors.grayLight}
          thumbTintColor={APP_CONFIG.colors.primaryLight}
        />
        <Text style={styles.icon}>🔊</Text>
      </View>
      <Text style={styles.value}>
        {volumeToPercentage(volume)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  value: {
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 5,
  },
});

