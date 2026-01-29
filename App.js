import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import RadioPlayer from './components/RadioPlayer';
import AdminPanel from './components/AdminPanel';

// Mantener el splash screen visible mientras cargamos
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const radioPlayerRef = useRef(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-cargar fuentes, hacer llamadas API, etc.
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const handleStreamUpdate = (newUrl) => {
    if (radioPlayerRef.current) {
      radioPlayerRef.current.updateStreamUrl(newUrl);
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6', '#60A5FA']}
        style={styles.gradient}
      >
        {showAdmin ? (
          <AdminPanel 
            onBack={() => setShowAdmin(false)}
            onStreamUpdate={handleStreamUpdate}
          />
        ) : (
          <RadioPlayer 
            ref={radioPlayerRef}
            onShowAdmin={() => setShowAdmin(true)} 
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
