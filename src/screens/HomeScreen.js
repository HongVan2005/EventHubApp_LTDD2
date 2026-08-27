// ============================================================
// 10. HOME - Màn hình trang chủ, hiển thị danh mục & sự kiện nổi bật
// ============================================================
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import { categories, events } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Phần header màu tím chứa vị trí, tìm kiếm và bộ lọc */}
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={26} color={colors.white} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.locationLabel}>Current Location ▾</Text>
            <Text style={styles.locationValue}>Da Nang, Vietnam</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <TouchableOpacity style={styles.searchBox} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={18} color={colors.white} />
            <Text style={styles.searchPlaceholder}>Search...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('Filter')}>
            <Ionicons name="options-outline" size={16} color={colors.white} />
            <Text style={styles.filterText}> Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Danh mục sự kiện */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow} contentContainerStyle={{ paddingHorizontal: spacing.md }}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryPill, { backgroundColor: cat.color }]}>
              <Ionicons name={cat.icon} size={16} color={colors.white} />
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sự kiện sắp diễn ra */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SeeAllEvents')}>
            <Text style={styles.seeAll}>See All ›</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: spacing.md }}>
          {events.slice(0, 3).map((ev) => (
            <EventCard key={ev.id} event={ev} onPress={() => navigation.navigate('EventDetails', { event: ev })} />
          ))}
        </ScrollView>

        {/* Banner mời bạn bè */}
        <TouchableOpacity style={styles.inviteBanner} onPress={() => navigation.navigate('InviteFriend')} activeOpacity={0.9}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteTitle}>Invite your friends</Text>
            <Text style={styles.inviteSub}>Get $20 for ticket</Text>
            <View style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>INVITE</Text>
            </View>
          </View>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3082/3082031.png' }} style={styles.inviteImage} />
        </TouchableOpacity>

        {/* Sự kiện gần đây */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby You</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SeeAllEvents')}>
            <Text style={styles.seeAll}>See All ›</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: spacing.md }}>
          {events.slice(2).map((ev) => (
            <EventCard key={ev.id} event={ev} horizontal={false} onPress={() => navigation.navigate('EventDetails', { event: ev })} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerSafe: { backgroundColor: colors.primary, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingBottom: spacing.lg },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, marginTop: spacing.sm },
  locationLabel: { color: 'rgba(255,255,255,0.8)', fontSize: fontSize.xs },
  locationValue: { color: colors.white, fontSize: fontSize.sm, fontWeight: '700' },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg, paddingHorizontal: spacing.md },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.lg, height: 46, paddingHorizontal: spacing.md, marginRight: spacing.sm },
  searchPlaceholder: { color: 'rgba(255,255,255,0.8)', marginLeft: spacing.sm },
  filterBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.lg, height: 46, paddingHorizontal: spacing.md },
  filterText: { color: colors.white, fontWeight: '600', fontSize: fontSize.xs },
  body: { flex: 1, marginTop: -12 },
  categoryRow: { marginTop: spacing.md, marginBottom: spacing.sm },
  categoryPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, height: 42, borderRadius: radius.full, marginRight: spacing.sm },
  categoryText: { color: colors.white, fontWeight: '700', marginLeft: 6, fontSize: fontSize.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, marginTop: spacing.lg, marginBottom: spacing.sm },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '800', color: colors.textPrimary },
  seeAll: { color: colors.textSecondary, fontSize: fontSize.sm },
  inviteBanner: { flexDirection: 'row', backgroundColor: '#D9FBF7', marginHorizontal: spacing.md, borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.md, alignItems: 'center', overflow: 'hidden' },
  inviteTitle: { fontSize: fontSize.md, fontWeight: '800', color: colors.textPrimary },
  inviteSub: { color: colors.textSecondary, marginTop: 2, marginBottom: spacing.sm },
  inviteBtn: { backgroundColor: colors.secondary, alignSelf: 'flex-start', paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radius.md },
  inviteBtnText: { color: colors.white, fontWeight: '700', fontSize: fontSize.xs },
  inviteImage: { width: 70, height: 70, resizeMode: 'contain' },
});
