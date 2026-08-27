// src/screens/EventsScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { events } from '../data/mockData';

export default function EventsScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredEvents = activeTab === 'upcoming' ? events : [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* HEADER BAR ĐÃ ĐƯỢC CÂN CHỈNH KHOẢNG CÁCH CÂN ĐỐI */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>{t('events')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={styles.filterIconButton}>
          <Ionicons name="options-outline" size={22} color={themeColors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* TABS SWITCHER */}
      <View style={[styles.tabBar, { backgroundColor: themeColors.surface }]}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'upcoming' && styles.activeTabBtn]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' ? styles.activeTabText : { color: themeColors.textSecondary }]}>
            {t('upcoming')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'finished' && styles.activeTabBtn]}
          onPress={() => setActiveTab('finished')}
        >
          <Text style={[styles.tabText, activeTab === 'finished' ? styles.activeTabText : { color: themeColors.textSecondary }]}>
            {t('finished')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* EVENT LIST */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => (
            <TouchableOpacity
              key={ev.id}
              style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => navigation.navigate('EventDetails', { event: ev })}
            >
              <Image source={{ uri: ev.image }} style={styles.cardImg} />
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>{ev.title}</Text>
                <Text style={styles.cardSub}>+20 {t('goingCount')}</Text>
                <Text style={[styles.cardLocation, { color: themeColors.textSecondary }]}>📍 {ev.location}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={80} color={themeColors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: themeColors.textPrimary }]}>
              {t('noUpcomingEvents')}
            </Text>
            <Text style={[styles.emptySub, { color: themeColors.textSecondary }]}>
              {t('noUpcomingDesc')}
            </Text>
            <TouchableOpacity style={styles.exploreBtn} onPress={() => setActiveTab('upcoming')}>
              <Text style={styles.exploreText}>{t('exploreEvents')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 14 
  },
  headerTitle: { fontSize: 24, fontWeight: '800' },
  filterIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: { flexDirection: 'row', marginHorizontal: 16, borderRadius: 30, padding: 4, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 25 },
  activeTabBtn: { backgroundColor: '#5669FF' },
  tabText: { fontWeight: '700', fontSize: 13 },
  activeTabText: { color: '#FFFFFF' },
  scroll: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { borderRadius: 16, borderWidth: 1, marginBottom: 16, overflow: 'hidden' },
  cardImg: { width: '100%', height: 160 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSub: { color: '#5669FF', fontSize: 12, marginTop: 4 },
  cardLocation: { fontSize: 12, marginTop: 4 },
  emptyBox: { alignItems: 'center', justifyContent: 'center', marginTop: 60, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 18, fontWeight: '800', marginTop: 16 },
  emptySub: { textAlign: 'center', marginTop: 8, lineHeight: 20 },
  exploreBtn: { backgroundColor: '#5669FF', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12, marginTop: 24 },
  exploreText: { color: '#FFFFFF', fontWeight: '800' },
});