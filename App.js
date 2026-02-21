import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, Dimensions, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import RadioPlayer from './components/RadioPlayer';
import { APP_CONFIG } from './constants/Config';

const { width } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

function DecoStars() {
  const positions = [
    { top: '8%', left: '10%', size: 2, opacity: 0.3 },
    { top: '5%', right: '15%', size: 3, opacity: 0.5 },
    { top: '12%', right: '30%', size: 1.5, opacity: 0.2 },
    { top: '3%', left: '40%', size: 2.5, opacity: 0.4 },
    { top: '15%', left: '70%', size: 2, opacity: 0.3 },
    { top: '7%', left: '55%', size: 1.5, opacity: 0.25 },
    { top: '10%', right: '8%', size: 2, opacity: 0.35 },
  ];
  return positions.map((star, i) => (
    <View
      key={i}
      style={[
        styles.star,
        {
          top: star.top,
          left: star.left,
          right: star.right,
          width: star.size,
          height: star.size,
          borderRadius: star.size / 2,
          opacity: star.opacity,
        },
      ]}
    />
  ));
}

function SunsetGlow() {
  return (
    <View style={styles.sunsetGlowContainer}>
      <View style={styles.sunsetGlowOuter} />
      <View style={styles.sunsetGlowInner} />
    </View>
  );
}

function PrairieHorizon() {
  return (
    <View style={styles.horizonContainer}>
      <View style={styles.horizonLine} />
      <View style={styles.grassRow}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.grassBlade,
              {
                height: 8 + Math.random() * 14,
                marginHorizontal: Math.random() * 3,
                opacity: 0.15 + Math.random() * 0.2,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const radioPlayerRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[
          APP_CONFIG.colors.sunset1,
          APP_CONFIG.colors.sunset2,
          APP_CONFIG.colors.sunset3,
          APP_CONFIG.colors.sunset4,
          APP_CONFIG.colors.sunset5,
        ]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.gradient}
      >
        <DecoStars />
        <SunsetGlow />

        <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
          <RadioPlayer ref={radioPlayerRef} />
        </Animated.View>

        <PrairieHorizon />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.colors.bgDark,
  },
  gradient: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    zIndex: 2,
  },
  star: {
    position: 'absolute',
    backgroundColor: APP_CONFIG.colors.goldSoft,
    zIndex: 1,
  },
  sunsetGlowContainer: {
    position: 'absolute',
    bottom: '25%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  sunsetGlowOuter: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 0.6,
    borderRadius: width * 0.6,
    backgroundColor: 'rgba(232, 148, 58, 0.06)',
  },
  sunsetGlowInner: {
    width: width * 0.8,
    height: width * 0.35,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(245, 166, 35, 0.04)',
  },
  horizonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 1,
  },
  horizonLine: {
    height: 1,
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
  },
  grassRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 28,
    overflow: 'hidden',
  },
  grassBlade: {
    width: 2,
    backgroundColor: 'rgba(74, 124, 63, 0.25)',
    borderRadius: 1,
  },
});
