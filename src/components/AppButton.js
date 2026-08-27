// ============================================================
// Component nút bấm dùng chung cho toàn bộ ứng dụng
// Hỗ trợ 2 kiểu: "solid" (nền màu) và "outline" (viền)
// ============================================================
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function AppButton({
  title,
  onPress,
  variant = 'solid', // 'solid' | 'outline' | 'social'
  icon, // tên icon Ionicons hiển thị bên trái (vd: dùng cho nút Google/Facebook)
  showArrow = false, // hiển thị icon mũi tên bên phải (giống nút Sign in trong thiết kế)
  loading = false,
  disabled = false,
  style,
}) {
  const isOutline = variant === 'outline';
  const isSocial = variant === 'social';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isOutline && styles.outline,
        isSocial && styles.social,
        !isOutline && !isSocial && styles.solid,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline || isSocial ? colors.primary : colors.white} />
      ) : (
        <View style={styles.content}>
          {icon && <Ionicons name={icon} size={20} color={isSocial ? colors.textPrimary : colors.white} style={{ marginRight: 10 }} />}
          <Text
            style={[
              styles.text,
              (isOutline || isSocial) && { color: colors.textPrimary },
            ]}
          >
            {title}
          </Text>
          {showArrow && (
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={16} color={colors.white} />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  solid: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  social: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  arrowCircle: {
    position: 'absolute',
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
