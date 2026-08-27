// src/screens/FilterScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

export default function FilterScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const [selectedTime, setSelectedTime] = useState('Today');
  const [selectedCat, setSelectedCat] = useState('Sports');

  const curr = t('currency'); // Tự động lấy ký hiệu tiền tệ tương ứng ($ hoặc đ)
  const priceDisplay = curr === 'đ' ? '0đ - 500.000đ' : '$0 - $50';

  const timeOptions = [
    { key: 'Today', label: t('today') },
    { key: 'Tomorrow', label: t('tomorrow') },
    { key: 'This Week', label: t('thisWeek') },
    { key: 'This Month', label: t('thisMonth') },
  ];

  const catOptions = [
    { key: 'Sports', label: t('sports') },
    { key: 'Music', label: t('music') },
    { key: 'Food', label: t('food') },
    { key: 'Art', label: t('art') },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.roundBtn, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}
        >
          <Ionicons name="close-outline" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>{t('filter')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* TIME & DATE */}
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('timeDate')}</Text>
        <View style={styles.chipRow}>
          {timeOptions.map((time) => {
            const isSelected = selectedTime === time.key;
            return (
              <TouchableOpacity
                key={time.key}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? '#5669FF' : themeColors.surface,
                    borderColor: isSelected ? '#5669FF' : themeColors.border,
                  },
                ]}
                onPress={() => setSelectedTime(time.key)}
              >
                <Text style={{ color: isSelected ? '#FFFFFF' : themeColors.textPrimary, fontWeight: '600' }}>
                  {time.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CATEGORY */}
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('category')}</Text>
        <View style={styles.chipRow}>
          {catOptions.map((cat) => {
            const isSelected = selectedCat === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? '#5669FF' : themeColors.surface,
                    borderColor: isSelected ? '#5669FF' : themeColors.border,
                  },
                ]}
                onPress={() => setSelectedCat(cat.key)}
              >
                <Text style={{ color: isSelected ? '#FFFFFF' : themeColors.textPrimary, fontWeight: '600' }}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* LOCATION */}
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('location')}</Text>
        <View style={[styles.locationBox, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Ionicons name="location-outline" size={20} color="#5669FF" />
          <Text style={[styles.locationText, { color: themeColors.textPrimary }]}>Da Nang, Vietnam</Text>
        </View>

        {/* PRICE RANGE */}
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary, marginTop: 16 }]}>
          {t('priceRange')}: {priceDisplay}
        </Text>
        <View style={[styles.sliderTrack, { backgroundColor: themeColors.border }]}>
          <View style={[styles.sliderFill, { backgroundColor: '#5669FF' }]} />
        </View>
      </ScrollView>

      {/* FOOTER BUTTONS */}
      <View style={[styles.footer, { backgroundColor: themeColors.background, borderTopColor: themeColors.border }]}>
        <TouchableOpacity 
          style={[styles.resetBtn, { borderColor: themeColors.border, backgroundColor: themeColors.surface }]} 
          onPress={() => { setSelectedTime('Today'); setSelectedCat('Sports'); }}
        >
          <Text style={[styles.resetText, { color: themeColors.textSecondary }]}>{t('reset')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.applyText}>{t('apply')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  roundBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scroll: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, marginRight: 8, marginBottom: 8 },
  locationBox: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1 },
  locationText: { marginLeft: 10, fontSize: 15, fontWeight: '600' },
  sliderTrack: { height: 6, borderRadius: 3, marginTop: 12, marginBottom: 20, overflow: 'hidden' },
  sliderFill: { width: '60%', height: '100%' },
  footer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, alignItems: 'center' },
  resetBtn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, borderWidth: 1, marginRight: 12 },
  resetText: { fontWeight: '700', fontSize: 14 },
  applyBtn: { flex: 1, backgroundColor: '#5669FF', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  applyText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});