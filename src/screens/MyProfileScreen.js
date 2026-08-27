// ============================================================
// 17. MY PROFILE - Hồ sơ cá nhân của người dùng hiện tại
// ============================================================
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { currentUser, events } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function MyProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.roundBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileBox}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{currentUser.name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>{currentUser.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interest</Text>
          <View style={styles.interestRow}>
            {currentUser.interests.map((it) => (
              <View key={it} style={styles.interestChip}>
                <Text style={styles.interestText}>{it}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Events</Text>
          {events.slice(0, 2).map((ev) => (
            <TouchableOpacity key={ev.id} style={styles.eventRow} onPress={() => navigation.navigate('EventDetails', { event: ev })}>
              <Image source={{ uri: ev.image }} style={styles.eventThumb} />
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <Text style={styles.eventTitle} numberOfLines={1}>{ev.title}</Text>
                <Text style={styles.eventSub}>{ev.date} · {ev.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
  profileBox: { alignItems: 'center', paddingVertical: spacing.md },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: spacing.sm, borderWidth: 3, borderColor: colors.primaryLight },
  name: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  statItem: { alignItems: 'center', paddingHorizontal: spacing.lg },
  statNumber: { fontSize: fontSize.md, fontWeight: '800', color: colors.textPrimary },
  statLabel: { color: colors.textSecondary, fontSize: fontSize.xs },
  statDivider: { width: 1, height: 24, backgroundColor: colors.border },
  editBtn: { marginTop: spacing.md, borderWidth: 1, borderColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: 8 },
  editText: { color: colors.primary, fontWeight: '700' },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.sm },
  aboutText: { color: colors.textSecondary, lineHeight: 20 },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap' },
  interestChip: { backgroundColor: colors.primaryLight, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6, marginRight: spacing.sm, marginBottom: spacing.sm },
  interestText: { color: colors.primary, fontWeight: '600', fontSize: fontSize.xs },
  eventRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  eventThumb: { width: 56, height: 56, borderRadius: radius.md },
  eventTitle: { fontWeight: '700', color: colors.textPrimary },
  eventSub: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: 2 },
});
