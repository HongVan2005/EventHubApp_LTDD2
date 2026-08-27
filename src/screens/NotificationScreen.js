// ============================================================
// 21 & 22. NOTIFICATION / EMPTY NOTIFICATION
// Màn hình danh sách thông báo, có nút demo để xem trạng thái trống
// ============================================================
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { notifications as mockNotifications } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function NotificationScreen({ navigation }) {
  // showEmpty dùng để minh hoạ cả 2 trạng thái: có thông báo / không có thông báo
  const [showEmpty, setShowEmpty] = useState(false);
  const data = showEmpty ? [] : mockNotifications;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity style={styles.roundBtn} onPress={() => setShowEmpty(!showEmpty)}>
          <Ionicons name={showEmpty ? 'refresh' : 'checkmark-done-outline'} size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {data.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="notifications-off-outline" size={72} color={colors.textPlaceholder} />
          <Text style={styles.emptyTitle}>No Notification</Text>
          <Text style={styles.emptySub}>Bạn chưa có thông báo nào ở đây, quay lại sau nhé.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
          renderItem={({ item }) => (
            <View style={styles.notiRow}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <Text style={styles.notiText}>
                  <Text style={styles.notiName}>{item.name}</Text> {item.message}
                </Text>
                <Text style={styles.notiTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary, marginTop: spacing.md },
  emptySub: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs, lineHeight: 20 },
  notiRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.sm, marginBottom: spacing.sm },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  notiText: { color: colors.textPrimary, lineHeight: 19 },
  notiName: { fontWeight: '700' },
  notiTime: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: 2 },
});
