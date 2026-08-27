// ============================================================
// 18, 19, 20. ORGANIZER PROFILE - About / Event / Review
// Hồ sơ ban tổ chức sự kiện, có 3 tab chuyển đổi nội dung
// ============================================================
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { organizer, events } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

const TABS = ['About', 'Event', 'Review'];

export default function OrganizerProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Organizer Profile</Text>
        <View style={styles.roundBtn} />
      </View>

      <View style={styles.profileBox}>
        <Image source={{ uri: organizer.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{organizer.name}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>{organizer.followers} Followers</Text>
          <View style={styles.dotSep} />
          <Text style={styles.statText}>{organizer.following} Following</Text>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followText}>+ Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBtn}>
            <Ionicons name="chatbubble-outline" size={16} color={colors.primary} />
            <Text style={styles.messageText}> Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Thanh tab About / Event / Review */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity key={t} style={styles.tabBtn} onPress={() => setActiveTab(t)}>
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t.toUpperCase()}</Text>
            {activeTab === t && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl }}>
        {activeTab === 'About' && <Text style={styles.aboutText}>{organizer.about}</Text>}

        {activeTab === 'Event' &&
          events.slice(0, 3).map((ev) => (
            <TouchableOpacity key={ev.id} style={styles.eventRow} onPress={() => navigation.navigate('EventDetails', { event: ev })}>
              <Image source={{ uri: ev.image }} style={styles.eventThumb} />
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <Text style={styles.eventTitle} numberOfLines={1}>{ev.title}</Text>
                <Text style={styles.eventSub}>{ev.date} · {ev.location}</Text>
              </View>
            </TouchableOpacity>
          ))}

        {activeTab === 'Review' &&
          organizer.reviews.map((rv) => (
            <View key={rv.id} style={styles.reviewRow}>
              <Image source={{ uri: rv.avatar }} style={styles.reviewAvatar} />
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.reviewName}>{rv.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Ionicons key={i} name={i < rv.rating ? 'star' : 'star-outline'} size={13} color={colors.warning} />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{rv.comment}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.md, fontWeight: '800', color: colors.textPrimary },
  profileBox: { alignItems: 'center', paddingBottom: spacing.md },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: spacing.sm },
  name: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statText: { color: colors.textSecondary, fontSize: fontSize.sm },
  dotSep: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.textSecondary, marginHorizontal: spacing.sm },
  actionRow: { flexDirection: 'row', marginTop: spacing.md },
  followBtn: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: 10, marginRight: spacing.sm },
  followText: { color: colors.white, fontWeight: '700' },
  messageBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: 10 },
  messageText: { color: colors.primary, fontWeight: '700' },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  tabText: { color: colors.textSecondary, fontWeight: '700', fontSize: fontSize.xs },
  tabTextActive: { color: colors.primary },
  tabIndicator: { height: 3, backgroundColor: colors.primary, width: '60%', marginTop: 6, borderRadius: 2 },
  aboutText: { color: colors.textSecondary, lineHeight: 20 },
  eventRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  eventThumb: { width: 56, height: 56, borderRadius: radius.md },
  eventTitle: { fontWeight: '700', color: colors.textPrimary },
  eventSub: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: 2 },
  reviewRow: { flexDirection: 'row', marginBottom: spacing.lg },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewName: { fontWeight: '700', color: colors.textPrimary },
  reviewComment: { color: colors.textSecondary, marginTop: 4, lineHeight: 18 },
});
