import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { APP_CONFIG } from '../constants/Config';

/**
 * Componente para mostrar una tarjeta de stream guardado
 */
export default function StreamCard({ 
  stream, 
  onUse, 
  onTest, 
  onDelete 
}) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{stream.name}</Text>
        <Text style={styles.url} numberOfLines={1}>
          {stream.url}
        </Text>
        <Text style={styles.date}>
          Creado: {new Date(stream.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.useButton]}
          onPress={() => onUse(stream.url)}
        >
          <Text style={styles.buttonText}>Usar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.testButton]}
          onPress={() => onTest(stream.url)}
        >
          <Text style={styles.buttonText}>Probar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(stream.id)}
        >
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  info: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  url: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  useButton: {
    backgroundColor: APP_CONFIG.colors.primaryLight,
  },
  testButton: {
    backgroundColor: APP_CONFIG.colors.success,
  },
  deleteButton: {
    backgroundColor: APP_CONFIG.colors.error,
    minWidth: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

