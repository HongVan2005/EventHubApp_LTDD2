// src/screens/ShareEventScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { friends } from '../data/mockData';

export default function ShareEventScreen({ route, navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const { event } = route.params || {};

  const socialApps = [
    { name: 'Messages', icon: 'chatbubble', color: '#2ED47A' },
    { name: 'WhatsApp', icon: 'logo-whatsapp', color: '#25D366' },
    { name: 'Facebook', icon: 'logo-facebook', color: '#3b5998' },
    { name: 'Instagram', icon: 'logo-instagram', color: '#E1306C' },
    { name: 'Twitter', icon: 'logo-twitter', color: '#1DA1F2' },
    { name: 'Copy Link', icon: 'link', color: '#888888' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.roundBtn, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}>
          <Ionicons name="chevron-back" size={22} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>Share Event</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {event && (
          <View style={[styles.eventPreview, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Image source={{ uri: event.image }} style={styles.previewImg} />
            <View style={{ padding: 12 }}>
              <Text style={[styles.previewTitle, { color: themeColors.textPrimary }]}>{event.title}</Text>
              <Text style={[styles.previewSub, { color: themeColors.textSecondary }]}>{event.date} · {event.location}</Text>
            </View>
          </View>
        )}

        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Share with friends</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
          {friends.map((f) => (
            <View key={f.id} style={{ alignItems: 'center', marginRight: 16 }}>
              <Image source={{ uri: f.avatar }} style={styles.friendAvatar} />
              <Text style={[styles.friendName, { color: themeColors.textPrimary }]} numberOfLines={1}>{f.name.split(' ')[0]}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary, marginTop: 20 }]}>Share via</Text>
        <View style={styles.gridRow}>
          {socialApps.map((app, index) => (
            <TouchableOpacity key={index} style={styles.appItem}>
              <View style={[styles.appIconBox, { backgroundColor: app.color }]}>
                <Ionicons name={app.icon} size={26} color="#FFFFFF" />
              </View>
              <Text style={[styles.appName, { color: themeColors.textPrimary }]}>{app.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: themeColors.background, borderTopColor: themeColors.border }]}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>CANCEL</Text>
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
  eventPreview: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginBottom: 20 },
  previewImg: { width: '100%', height: 140 },
  previewTitle: { fontSize: 16, fontWeight: '700' },
  previewSub: { fontSize: 12, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  friendAvatar: { width: 56, height: 56, borderRadius: 28, marginBottom: 6 },
  friendName: { fontSize: 12, fontWeight: '600' },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  appItem: { width: '30%', alignItems: 'center', marginBottom: 20 },
  appIconBox: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  appName: { fontSize: 12, fontWeight: '600' },
  footer: { padding: 16, borderTopWidth: 1 },
  cancelBtn: { paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  cancelText: { color: '#F56B3F', fontWeight: '800', fontSize: 16 },
});