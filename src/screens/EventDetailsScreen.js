// src/screens/EventDetailsScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

export default function EventDetailsScreen({ route, navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const { event } = route.params || {};

  if (!event) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.bannerImg} />
          <View style={styles.topActions}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleBtn}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('ShareEvent', { event })} style={[styles.circleBtn, { marginRight: 10 }]}>
                <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleBtn}>
                <Ionicons name="bookmark-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={[styles.dateText, { color: '#5669FF' }]}>{event.date} · 20:00</Text>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>{event.title}</Text>

          <View style={[styles.organizerBox, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Image source={{ uri: 'https://i.pravatar.cc/200?img=51' }} style={styles.orgAvatar} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.orgName, { color: themeColors.textPrimary }]}>{event.organizer || 'David Sibia'}</Text>
              <Text style={[styles.orgRole, { color: themeColors.textSecondary }]}>{t('organizer')}</Text>
            </View>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 13 }}>{t('follow')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={22} color="#5669FF" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.infoTitle, { color: themeColors.textPrimary }]}>{event.location}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MapView')}>
                <Text style={{ color: '#5669FF', fontSize: 13, marginTop: 2, fontWeight: '600' }}>{t('viewOnMap')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.infoRow, { marginTop: 16 }]}>
            <Ionicons name="people-outline" size={22} color="#5669FF" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.infoTitle, { color: themeColors.textPrimary }]}>+{event.going || 20} {t('goingCount')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('InviteFriend')}>
                <Text style={{ color: '#5669FF', fontSize: 13, marginTop: 2, fontWeight: '600' }}>{t('inviteFriend')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary, marginTop: 24 }]}>{t('aboutEvent')}</Text>
          <Text style={[styles.description, { color: themeColors.textSecondary }]}>
            {event.description || 'Sự kiện âm nhạc hoành tráng được mong chờ nhất trong năm với hệ thống âm thanh, ánh sáng hiện đại bậc nhất.'}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: themeColors.background, borderTopColor: themeColors.border }]}>
        <View>
          <Text style={{ fontSize: 12, color: themeColors.textSecondary }}>{t('price')}</Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#5669FF' }}>${event.price || 50}</Text>
        </View>
        <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('Checkout', { event })}>
          <Text style={styles.buyText}>{t('buyTicket')}</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { width: '100%', height: 260, position: 'relative' },
  bannerImg: { width: '100%', height: '100%' },
  topActions: { position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  circleBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  dateText: { fontSize: 14, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', marginTop: 6 },
  organizerBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1, marginVertical: 16 },
  orgAvatar: { width: 48, height: 48, borderRadius: 24 },
  orgName: { fontSize: 16, fontWeight: '700' },
  orgRole: { fontSize: 12, marginTop: 2 },
  followBtn: { backgroundColor: '#5669FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoTitle: { fontSize: 15, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  description: { fontSize: 14, lineHeight: 22 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTopWidth: 1 },
  buyBtn: { flexDirection: 'row', backgroundColor: '#5669FF', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 16, alignItems: 'center' },
  buyText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});