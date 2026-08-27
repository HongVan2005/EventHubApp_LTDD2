// src/screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';
import { events } from '../data/mockData';

export default function HomeScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* HEADER TOP BLUE BOX */}
        <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 16) }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()} 
              style={styles.iconBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="menu-outline" size={26} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.locationSub}>{t('currentLocation')}</Text>
                <Ionicons name="caret-down-sharp" size={10} color="#E0E0E0" style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.locationTitle}>Da Nang, Vietnam</Text>
            </View>

            <TouchableOpacity 
              onPress={() => navigation.navigate('Notification')} 
              style={styles.iconBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <TextInput
                placeholder={t('searchPlaceholder')}
                placeholderTextColor="#A0A5BA"
                style={styles.searchInput}
              />
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('Filter')}>
              <Ionicons name="options-outline" size={18} color="#FFFFFF" />
              <Text style={styles.filterText}>{t('filters')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CATEGORIES */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          <TouchableOpacity style={[styles.catChip, { backgroundColor: '#F26E56' }]}>
            <Ionicons name="basketball-outline" size={18} color="#FFFFFF" />
            <Text style={styles.catText}>{t('sports')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.catChip, { backgroundColor: '#F59E0B' }]}>
            <Ionicons name="musical-notes-outline" size={18} color="#FFFFFF" />
            <Text style={styles.catText}>{t('music')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.catChip, { backgroundColor: '#10B981' }]}>
            <Ionicons name="fast-food-outline" size={18} color="#FFFFFF" />
            <Text style={styles.catText}>{t('food')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.catChip, { backgroundColor: '#6366F1' }]}>
            <Ionicons name="color-palette-outline" size={18} color="#FFFFFF" />
            <Text style={styles.catText}>{t('art')}</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* UPCOMING EVENTS */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
            {t('upcomingEvents')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SeeAllEvents')}>
            <Text style={{ color: themeColors.textSecondary, fontSize: 13 }}>
              {t('seeAll')} ›
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }}>
          {events.map((ev) => (
            <TouchableOpacity
              key={ev.id}
              style={[styles.eventCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => navigation.navigate('EventDetails', { event: ev })}
            >
              <Image source={{ uri: ev.image }} style={styles.eventImg} />
              <View style={styles.cardContent}>
                <Text style={[styles.eventTitle, { color: themeColors.textPrimary }]} numberOfLines={1}>{ev.title}</Text>
                <Text style={{ color: '#5669FF', fontSize: 12, marginTop: 4, fontWeight: '600' }}>+20 {t('going')}</Text>
                <Text style={[styles.eventLocation, { color: themeColors.textSecondary }]} numberOfLines={1}>📍 {ev.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* INVITE BANNER */}
        <View style={styles.inviteBanner}>
          <View>
            <Text style={styles.inviteTitle}>{t('inviteFriends')}</Text>
            <Text style={styles.inviteSub}>{t('getDiscount')}</Text>
            <TouchableOpacity style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>{t('inviteBtn')}</Text>
            </TouchableOpacity>
          </View>
          <Ionicons name="cart-outline" size={60} color="#00F0FF" />
        </View>

        {/* NEARBY YOU */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
            {t('nearbyYou')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SeeAllEvents')}>
            <Text style={{ color: themeColors.textSecondary, fontSize: 13 }}>
              {t('seeAll')} ›
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { 
    backgroundColor: '#5669FF', 
    borderBottomLeftRadius: 32, 
    borderBottomRightRadius: 32, 
    paddingHorizontal: 16, 
    paddingBottom: 20 
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationSub: { color: '#E0E0E0', fontSize: 11 },
  locationTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 14, marginTop: 2 },
  searchRow: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { color: '#FFFFFF', flex: 1, fontSize: 14 },
  filterBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#5D6BFF', paddingHorizontal: 12, height: 44, borderRadius: 12, marginLeft: 8 },
  filterText: { color: '#FFFFFF', marginLeft: 4, fontWeight: '600', fontSize: 13 },
  categoryScroll: { paddingHorizontal: 16, marginVertical: 16 },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  catText: { color: '#FFFFFF', fontWeight: '700', marginLeft: 6, fontSize: 13 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  eventCard: { width: 220, borderRadius: 16, borderWidth: 1, marginRight: 14, overflow: 'hidden' },
  eventImg: { width: '100%', height: 130 },
  cardContent: { padding: 12 },
  eventTitle: { fontSize: 15, fontWeight: '700' },
  eventLocation: { fontSize: 12, marginTop: 6 },
  inviteBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D6FBFF', margin: 16, padding: 16, borderRadius: 16 },
  inviteTitle: { fontSize: 16, fontWeight: '800', color: '#120D26' },
  inviteSub: { fontSize: 12, color: '#747688', marginVertical: 4 },
  inviteBtn: { backgroundColor: '#00F0FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, alignSelf: 'flex-start', marginTop: 6 },
  inviteBtnText: { color: '#120D26', fontWeight: '800', fontSize: 12 },
});