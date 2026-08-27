// ============================================================
// 11. EVENT DETAILS - Chi tiết một sự kiện cụ thể
// ============================================================
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { events as allEvents } from '../data/mockData';
import AppButton from '../components/AppButton';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function EventDetailsScreen({ route, navigation }) {
  const event = route.params?.event || allEvents[0];
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: event.image }} style={styles.cover} />
        <SafeAreaView style={styles.headerOverlay}>
          <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.white} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.roundBtn, { marginRight: spacing.sm }]} onPress={() => navigation.navigate('Share', { event })}>
              <Ionicons name="share-social-outline" size={20} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundBtn} onPress={() => setSaved(!saved)}>
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ padding: spacing.lg, paddingBottom: 120 }}>
        <Text style={styles.date}>{event.date}, 2026 · 20:00</Text>
        <Text style={styles.title}>{event.title}</Text>

        <TouchableOpacity style={styles.organizerRow} onPress={() => navigation.navigate('OrganizerProfile')}>
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=13' }} style={styles.organizerAvatar} />
          <View style={{ marginLeft: spacing.sm, flex: 1 }}>
            <Text style={styles.organizerName}>{event.organizer}</Text>
            <Text style={styles.organizerLabel}>Organizer</Text>
          </View>
          <View style={styles.followBtn}>
            <Text style={styles.followText}>Follow</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
        <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate('MapView', { event })}>
          <Ionicons name="map-outline" size={18} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.primary, fontWeight: '600' }]}>Xem trên bản đồ</Text>
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>+{event.going} người đã tham gia</Text>
        </View>

        <Text style={styles.sectionTitle}>About Event</Text>
        <Text style={styles.description}>{event.description}</Text>
      </ScrollView>

      {/* Thanh giá + nút mua vé cố định dưới cùng */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{event.price === 0 ? 'Free' : `$${event.price}`}</Text>
        </View>
        <AppButton title="BUY TICKET" showArrow style={{ flex: 1, marginLeft: spacing.md }} onPress={() => navigation.navigate('InviteFriend')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  cover: { width: '100%', height: 320 },
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  roundBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1 },
  date: { color: colors.primary, fontWeight: '700', marginBottom: 6 },
  title: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.md },
  organizerRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.sm, marginBottom: spacing.md },
  organizerAvatar: { width: 44, height: 44, borderRadius: 22 },
  organizerName: { fontWeight: '700', color: colors.textPrimary },
  organizerLabel: { color: colors.textSecondary, fontSize: fontSize.xs },
  followBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radius.md },
  followText: { color: colors.white, fontWeight: '700', fontSize: fontSize.xs },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  infoText: { marginLeft: spacing.sm, color: colors.textPrimary, flexShrink: 1 },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '800', color: colors.textPrimary, marginTop: spacing.md, marginBottom: spacing.sm },
  description: { color: colors.textSecondary, lineHeight: 20 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  priceLabel: { color: colors.textSecondary, fontSize: fontSize.xs },
  price: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
});
