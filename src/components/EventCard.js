// ============================================================
// Component thẻ hiển thị 1 sự kiện (dùng ở Home, See All, Search...)
// ============================================================
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function EventCard({ event, onPress, style, horizontal = true }) {
  const [day, month] = event.date.split(' ');

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.card, horizontal && styles.horizontalWidth, style]}>
      <View>
        <Image source={{ uri: event.image }} style={styles.image} />
        {/* Nhãn ngày tháng góc trên trái */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{month}</Text>
        </View>
        {/* Icon lưu sự kiện góc trên phải */}
        <View style={styles.bookmarkBadge}>
          <Ionicons name="bookmark" size={16} color={colors.sports} />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="people-outline" size={14} color={colors.primary} />
          <Text style={styles.going}> +{event.going} Going</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.location} numberOfLines={1}>
            {' '}
            {event.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  horizontalWidth: {
    width: 240,
    marginRight: spacing.md,
  },
  image: {
    width: '100%',
    height: 130,
  },
  dateBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  dateDay: {
    color: colors.sports,
    fontWeight: '800',
    fontSize: fontSize.sm,
    lineHeight: 16,
  },
  dateMonth: {
    color: colors.sports,
    fontSize: 10,
    fontWeight: '700',
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.white,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: spacing.md,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  going: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  location: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    flexShrink: 1,
  },
});
