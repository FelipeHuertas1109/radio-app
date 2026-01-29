import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { APP_CONFIG } from '../constants/Config';

/**
 * Componente para mostrar el estado de la reproducción
 */
export default function StatusIndicator({ isLoading, error, buffering, isPlaying }) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={APP_CONFIG.colors.primaryLight} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (buffering) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={APP_CONFIG.colors.primaryLight} />
        <Text style={styles.statusText}>Cargando...</Text>
      </View>
    );
  }

  if (isPlaying) {
    return (
      <View style={styles.container}>
        <View style={styles.pulseCircle} />
        <Text style={styles.statusText}>En Vivo</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Detenido</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  pulseCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: APP_CONFIG.colors.success,
    marginBottom: 8,
  },
});

