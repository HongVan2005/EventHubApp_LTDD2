// ============================================================
// 14. FILTER - Bộ lọc tìm kiếm sự kiện (thời gian, danh mục, giá, vị trí)
// ============================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { categories } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

const timeOptions = ['Today', 'Tomorrow', 'This Week', 'This Month'];

export default function FilterScreen({ navigation }) {
  const [selectedTime, setSelectedTime] = useState('Today');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(50); // Giá demo (đơn vị $), tối đa 150

  // Bật/tắt chọn danh mục
  const toggleCategory = (id) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
          <Ionicons name="close" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
        <View style={styles.roundBtn} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <Text style={styles.sectionTitle}>Time & Date</Text>
        <View style={styles.chipRow}>
          {timeOptions.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.chip, selectedTime === t && styles.chipActive]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.chipText, selectedTime === t && styles.chipTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.chipRow}>
          {categories.map((c) => {
            const active = selectedCategories.includes(c.id);
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.chip, active && { backgroundColor: c.color, borderColor: c.color }]}
                onPress={() => toggleCategory(c.id)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{c.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationBox}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.locationText}>New York, USA</Text>
        </View>

        <Text style={styles.sectionTitle}>Price Range: $0 - ${price}</Text>
        <View style={styles.priceRow}>
          <TouchableOpacity style={styles.priceBtn} onPress={() => setPrice((p) => Math.max(0, p - 10))}>
            <Ionicons name="remove" size={18} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.priceTrack}>
            <View style={[styles.priceFill, { width: `${(price / 150) * 100}%` }]} />
          </View>
          <TouchableOpacity style={styles.priceBtn} onPress={() => setPrice((p) => Math.min(150, p + 10))}>
            <Ionicons name="add" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => { setSelectedCategories([]); setSelectedTime('Today'); setPrice(50); }}>
          <Text style={styles.resetText}>RESET</Text>
        </TouchableOpacity>
        <AppButton title="APPLY" style={{ flex: 1, marginLeft: spacing.md }} onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 8, marginRight: spacing.sm, marginBottom: spacing.sm },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textPrimary, fontSize: fontSize.sm, fontWeight: '600' },
  chipTextActive: { color: colors.white },
  locationBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
  locationText: { marginLeft: spacing.sm, color: colors.textPrimary },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  priceBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  priceTrack: { flex: 1, height: 6, backgroundColor: colors.border, borderRadius: 3, marginHorizontal: spacing.sm, overflow: 'hidden' },
  priceFill: { height: 6, backgroundColor: colors.primary },
  footer: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  resetText: { color: colors.textSecondary, fontWeight: '700' },
});
