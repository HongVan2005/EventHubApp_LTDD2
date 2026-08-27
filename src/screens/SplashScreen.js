// ============================================================
// 1. SPLASH SCREEN
// Màn hình chờ hiển thị logo khi vừa mở ứng dụng, tự động
// chuyển sang Onboarding sau một khoảng thời gian ngắn
// ============================================================
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, fontSize, spacing } from '../theme/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Sau 2 giây tự động chuyển sang màn hình Onboarding đầu tiên
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://api.dicebear.com/7.x/shapes/png?seed=eventhub&backgroundColor=transparent' }}
        style={styles.logoShape}
      />
      <Text style={styles.logoText}>
        <Text style={{ color: colors.primary }}>e</Text>
        <Text style={{ color: colors.textPrimary }}>Vent</Text>
        <Text style={{ color: colors.textPrimary }}>Hub</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoShape: {
    width: 90,
    height: 90,
    marginBottom: spacing.md,
    borderRadius: 45,
    backgroundColor: colors.primary,
  },
  logoText: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
  },
});
