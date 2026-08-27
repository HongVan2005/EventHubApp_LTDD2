// src/screens/MapViewScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { events } from '../data/mockData';

export default function MapViewScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* HEADER TÌM KIẾM BẢN ĐỒ */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.roundBtn, { backgroundColor: themeColors.surface }]}>
          <Ionicons name="chevron-back" size={22} color={themeColors.textPrimary} />
        </TouchableOpacity>

        <View style={[styles.searchBox, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
          <TextInput
            placeholder={t('searchPlaceholder') || 'Tìm sự kiện, địa điểm...'}
            placeholderTextColor={themeColors.textSecondary}
            style={[styles.searchInput, { color: themeColors.textPrimary }]}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={[styles.roundBtn, { backgroundColor: themeColors.surface }]}>
          <Ionicons name="options-outline" size={20} color={themeColors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* GIẢ LẬP BẢN ĐỒ VỚI THEME TỐI/SÁNG */}
      <View style={[styles.mapContainer, { backgroundColor: themeColors.surface }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800' }}
          style={styles.mapBg}
        />

        {/* THẺ HIỂN THỊ THÔNG TIN SỰ KIỆN TRÊN BẢN ĐỒ */}
        {selectedEvent && (
          <TouchableOpacity
            style={[styles.eventCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
            onPress={() => navigation.navigate('EventDetails', { event: selectedEvent })}
          >
            <Image source={{ uri: selectedEvent.image }} style={styles.cardThumb} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]} numberOfLines={1}>
                {selectedEvent.title}
              </Text>
              <Text style={[styles.cardLocation, { color: themeColors.textSecondary }]} numberOfLines={1}>
                📍 {selectedEvent.location}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 16, zIndex: 10 },
  roundBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, height: 44, borderRadius: 22, paddingHorizontal: 12, borderWidth: 1 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  mapContainer: { flex: 1, justifyContent: 'flex-end', padding: 16 },
  mapBg: { ...StyleSheet.absoluteFillObject, opacity: 0.8 },
  eventCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1, marginBottom: 20 },
  cardThumb: { width: 54, height: 54, borderRadius: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700' },
  cardLocation: { fontSize: 12, marginTop: 4 },
});