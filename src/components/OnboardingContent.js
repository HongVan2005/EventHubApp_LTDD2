// ============================================================
// Nội dung dùng chung cho 3 màn hình Onboarding (1, 2, 3)
// Mỗi màn hình Onboarding chỉ truyền dữ liệu khác nhau vào đây
// ============================================================
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function OnboardingContent({ image, title, description, step, totalStep = 3, onNext, onSkip, isLast }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Nút bỏ qua ở góc trên phải */}
      <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.bottomCard}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.footerRow}>
          {/* Chấm tròn thể hiện bước hiện tại */}
          <View style={styles.dotsRow}>
            {Array.from({ length: totalStep }).map((_, i) => (
              <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
            ))}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
            <Text style={styles.nextText}>{isLast ? 'Get Started' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  skipBtn: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: '58%',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 40,
    marginTop: -30,
    padding: spacing.xl,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  dotsRow: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginRight: 6,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.white,
  },
  nextBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    borderRadius: radius.full,
  },
  nextText: {
    color: colors.primary,
    fontWeight: '700',
  },
});
