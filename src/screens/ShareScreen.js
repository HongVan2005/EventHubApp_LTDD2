// ============================================================
// 24. SHARE - Chia sẻ sự kiện lên mạng xã hội hoặc bạn bè
// ============================================================
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { events, friends } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

// Danh sách kênh chia sẻ demo
const shareChannels = [
  { id: 's1', label: 'Messages', icon: 'chatbubble-ellipses', color: '#2ED47A' },
  { id: 's2', label: 'WhatsApp', icon: 'logo-whatsapp', color: '#25D366' },
  { id: 's3', label: 'Facebook', icon: 'logo-facebook', color: '#3B5998' },
  { id: 's4', label: 'Instagram', icon: 'logo-instagram', color: '#C13584' },
  { id: 's5', label: 'Twitter', icon: 'logo-twitter', color: '#1DA1F2' },
  { id: 's6', label: 'Copy Link', icon: 'link', color: colors.textSecondary },
];

export default function ShareScreen({ route, navigation }) {
  const event = route.params?.event || events[0];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <View style={{ padding: spacing.md }}>
          <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
          <Text style={styles.sub}>{event.date} · {event.location}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Share with friends</Text>
      <FlatList
        data={friends}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={{ uri: item.avatar }} style={styles.friendAvatar} />
            <Text style={styles.friendName} numberOfLines={1}>{item.name.split(' ')[0]}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Share via</Text>
      <View style={styles.channelGrid}>
        {shareChannels.map((c) => (
          <TouchableOpacity key={c.id} style={styles.channelItem}>
            <View style={[styles.channelIcon, { backgroundColor: c.color }]}>
              <Ionicons name={c.icon} size={22} color={colors.white} />
            </View>
            <Text style={styles.channelLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>CANCEL</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: spacing.lg },
  card: { marginHorizontal: spacing.md, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.background, marginBottom: spacing.lg },
  image: { width: '100%', height: 150 },
  title: { fontWeight: '800', fontSize: fontSize.md, color: colors.textPrimary },
  sub: { color: colors.textSecondary, marginTop: 4, fontSize: fontSize.xs },
  sectionTitle: { fontWeight: '800', fontSize: fontSize.md, color: colors.textPrimary, marginHorizontal: spacing.md, marginBottom: spacing.sm },
  friendItem: { alignItems: 'center', marginRight: spacing.md, width: 64 },
  friendAvatar: { width: 56, height: 56, borderRadius: 28, marginBottom: 4 },
  friendName: { fontSize: fontSize.xs, color: colors.textPrimary },
  channelGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.md, marginTop: spacing.md },
  channelItem: { width: '33.33%', alignItems: 'center', marginBottom: spacing.lg },
  channelIcon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  channelLabel: { fontSize: fontSize.xs, color: colors.textPrimary },
  cancelBtn: { margin: spacing.md, alignItems: 'center', paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  cancelText: { color: colors.danger, fontWeight: '700' },
});
