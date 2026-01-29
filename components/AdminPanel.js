import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@hqs_radio_settings';
const DEFAULT_STREAM_URL = 'https://radio.hqs.com.co:9004/stream';

export default function AdminPanel({ onBack, onStreamUpdate }) {
  const [streamUrl, setStreamUrl] = useState(DEFAULT_STREAM_URL);
  const [savedStreams, setSavedStreams] = useState([]);
  const [streamName, setStreamName] = useState('');

  useEffect(() => {
    loadSavedStreams();
    loadCurrentStream();
  }, []);

  const loadCurrentStream = async () => {
    try {
      const savedUrl = await AsyncStorage.getItem(`${STORAGE_KEY}_url`);
      if (savedUrl) {
        setStreamUrl(savedUrl);
      }
    } catch (e) {
      console.error('Error loading current stream:', e);
    }
  };

  const loadSavedStreams = async () => {
    try {
      const saved = await AsyncStorage.getItem(`${STORAGE_KEY}_saved_streams`);
      if (saved) {
        setSavedStreams(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved streams:', e);
    }
  };

  const saveStreams = async (streams) => {
    try {
      await AsyncStorage.setItem(`${STORAGE_KEY}_saved_streams`, JSON.stringify(streams));
      setSavedStreams(streams);
    } catch (e) {
      console.error('Error saving streams:', e);
    }
  };

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSaveStream = () => {
    if (!streamUrl.trim()) {
      Alert.alert('Error', 'Por favor ingresa una URL válida');
      return;
    }

    if (!validateUrl(streamUrl)) {
      Alert.alert('Error', 'Por favor ingresa una URL válida (http:// o https://)');
      return;
    }

    const name = streamName.trim() || `Stream ${savedStreams.length + 1}`;
    const newStream = {
      id: Date.now().toString(),
      name,
      url: streamUrl.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedStreams = [...savedStreams, newStream];
    saveStreams(updatedStreams);
    setStreamName('');
    
    Alert.alert('Éxito', 'Stream guardado correctamente');
  };

  const handleSetAsCurrent = async (url) => {
    try {
      await AsyncStorage.setItem(`${STORAGE_KEY}_url`, url);
      setStreamUrl(url);
      if (onStreamUpdate) {
        onStreamUpdate(url);
      }
      Alert.alert('Éxito', 'Stream actualizado. Reinicia la reproducción para aplicar los cambios.');
    } catch (e) {
      Alert.alert('Error', 'No se pudo actualizar el stream');
    }
  };

  const handleDeleteStream = (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este stream?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedStreams = savedStreams.filter(s => s.id !== id);
            saveStreams(updatedStreams);
          },
        },
      ]
    );
  };

  const handleTestStream = async (url) => {
    Alert.alert(
      'Probar Stream',
      'Esta función probará la conexión al stream. ¿Deseas continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Probar',
          onPress: async () => {
            // Aquí podrías implementar una prueba real del stream
            Alert.alert('Info', 'Para probar el stream, úsalo como stream actual y reproduce.');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <BlurView intensity={20} style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Panel de Administración</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Current Stream */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stream Actual</Text>
            <TextInput
              style={styles.input}
              value={streamUrl}
              onChangeText={setStreamUrl}
              placeholder="URL del stream"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSetAsCurrent(streamUrl)}
            >
              <Text style={styles.saveButtonText}>Actualizar Stream Actual</Text>
            </TouchableOpacity>
          </View>

          {/* Add New Stream */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agregar Nuevo Stream</Text>
            <TextInput
              style={styles.input}
              value={streamName}
              onChangeText={setStreamName}
              placeholder="Nombre del stream (opcional)"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.input}
              value={streamUrl}
              onChangeText={setStreamUrl}
              placeholder="URL del stream"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveStream}
            >
              <Text style={styles.saveButtonText}>Guardar Stream</Text>
            </TouchableOpacity>
          </View>

          {/* Saved Streams */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Streams Guardados ({savedStreams.length})
            </Text>
            {savedStreams.length === 0 ? (
              <Text style={styles.emptyText}>No hay streams guardados</Text>
            ) : (
              savedStreams.map((stream) => (
                <View key={stream.id} style={styles.streamCard}>
                  <View style={styles.streamInfo}>
                    <Text style={styles.streamName}>{stream.name}</Text>
                    <Text style={styles.streamUrl} numberOfLines={1}>
                      {stream.url}
                    </Text>
                    <Text style={styles.streamDate}>
                      Creado: {new Date(stream.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.streamActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleSetAsCurrent(stream.url)}
                    >
                      <Text style={styles.actionButtonText}>Usar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.testButton]}
                      onPress={() => handleTestStream(stream.url)}
                    >
                      <Text style={styles.actionButtonText}>Probar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteStream(stream.id)}
                    >
                      <Text style={styles.actionButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información</Text>
            <Text style={styles.infoText}>
              • Los streams deben ser URLs válidas de IceCast 2{'\n'}
              • El formato debe ser: http:// o https://{'\n'}
              • Ejemplo: https://radio.hqs.com.co:9004/stream{'\n'}
              • Los cambios se aplican al reiniciar la reproducción
            </Text>
          </View>
        </ScrollView>
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  streamCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  streamInfo: {
    marginBottom: 10,
  },
  streamName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  streamUrl: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 5,
  },
  streamDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  streamActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  testButton: {
    backgroundColor: '#10B981',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    minWidth: 50,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontStyle: 'italic',
  },
  infoText: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    padding: 15,
  },
});

