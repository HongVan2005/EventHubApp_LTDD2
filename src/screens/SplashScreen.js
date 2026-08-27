// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Component Logo Icon dạng SVG
const LogoIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 100 100" fill="none">
    <Path
      d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C68.5 90 83.8 77.4 88.2 60H68C64.2 68.8 55.4 75 45 75C31.2 75 20 63.8 20 50C20 36.2 31.2 25 45 25C55.4 25 64.2 31.2 68 40H88.2C83.8 22.6 68.5 10 50 10Z"
      fill="#5669FF"
    />
    <Path
      d="M38 43H85C87.7614 43 90 45.2386 90 48V52C90 54.7614 87.7614 57 85 57H38C35.2386 57 33 54.7614 33 52V48C33 45.2386 35.2386 43 38 43Z"
      fill="#00F0FF"
      transform="rotate(-20 60 50)"
    />
  </Svg>
);

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Tự động chuyển màn hình sau 2 giây[cite: 4]
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoRow}>
        <LogoIcon />
        <Text style={styles.brandText}>
          <Text style={{ color: '#5669FF' }}>vent</Text>
          <Text style={{ color: '#00F0FF', fontWeight: '800' }}>Hub</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 34,
    fontWeight: '700',
    marginLeft: 10,
  },
});