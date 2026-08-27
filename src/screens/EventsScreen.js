// ============================================================
// 15 & 16. SEE ALL EVENTS / EMPTY EVENTS
// Màn hình danh sách toàn bộ sự kiện, có 2 tab: Upcoming / Finished
// Khi danh sách rỗng sẽ hiển thị trạng thái "Empty Events"
// ============================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import AppButton from '../components/AppButton';
import { events } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function EventsScreen({ navigation }) {
  const [tab, setTab] = useState('upcoming'); // 'upcoming' | 'finished'

  // Tab "finished" chưa có dữ liệu mẫu -> minh hoạ trạng thái Empty Events
  const data = tab === 'upcoming' ? events : [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Ionicons name="options-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Chuyển tab để xem cả 2 trạng thái giao diện: có sự kiện / trống */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tabBtn, tab === 'upcoming' && styles.tabBtnActive]} onPress={() => setTab('upcoming')}>
          <Text style={[styles.tabText, tab === 'upcoming' && styles.tabTextActive]}>UPCOMING</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, tab === 'finished' && styles.tabBtnActive]} onPress={() => setTab('finished')}>
          <Text style={[styles.tabText, tab === 'finished' && styles.tabTextActive]}>FINISHED</Text>
        </TouchableOpacity>
      </View>

      {data.length === 0 ? (
        // Trạng thái không có sự kiện nào (Empty Events)
        <View style={styles.emptyBox}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png' }} style={styles.emptyImage} />
          <Text style={styles.emptyTitle}>No Upcoming Event</Text>
          <Text style={styles.emptySub}>Hiện chưa có sự kiện nào ở mục này, hãy khám phá thêm sự kiện mới nhé.</Text>
          <AppButton title="EXPLORE EVENTS" onPress={() => setTab('upcoming')} style={{ marginTop: spacing.lg, width: '100%' }} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
          renderItem={({ item }) => (
            <EventCard event={item} horizontal={false} onPress={() => navigation.navigate('EventDetails', { event: item })} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  headerTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary },
  tabRow: { flexDirection: 'row', marginHorizontal: spacing.md, backgroundColor: colors.card, borderRadius: radius.full, padding: 4, marginBottom: spacing.sm },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: radius.full, alignItems: 'center' },
  tabBtnActive: { backgroundColor: colors.primary },
  tabText: { color: colors.textSecondary, fontWeight: '700', fontSize: fontSize.xs },
  tabTextActive: { color: colors.white },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  emptyImage: { width: 120, height: 120, marginBottom: spacing.lg, opacity: 0.8 },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.xs },
  emptySub: { color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
});
