// ============================================================
// Icon cho từng tab dưới cùng, đổi màu khi được chọn (focused)
// ============================================================
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize } from '../theme/colors';

export default function TabBarIcon({ name, label, focused }) {
  return (
    <View style={styles.container}>
      <Ionicons name={name} size={22} color={focused ? colors.primary : colors.textSecondary} />
      <Text style={[styles.label, { color: focused ? colors.primary : colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  label: { fontSize: fontSize.xs, marginTop: 2, fontWeight: '600' },
});
