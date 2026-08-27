// ============================================================
// 12. MAP VIEW - Xem vị trí các sự kiện trên bản đồ
// Lưu ý: để tránh phụ thuộc thư viện bản đồ gốc (cần cấu hình
// native phức tạp), màn hình này dùng ảnh bản đồ tĩnh minh hoạ
// kèm các ghim (pin) vị trí sự kiện chồng lên trên.
// ============================================================
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { events } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

// Vị trí ghim minh hoạ trên ảnh bản đồ (toạ độ phần trăm theo chiều rộng/cao)
const pinPositions = [
  { top: '30%', left: '25%' },
  { top: '45%', left: '60%' },
  { top: '62%', left: '35%' },
];

export default function MapViewScreen({ route, navigation }) {
  const focusedEvent = route.params?.event || events[0];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900' }}
        style={styles.map}
      >
        {pinPositions.map((pos, index) => (
          <View key={index} style={[styles.pin, pos]}>
            <Ionicons name="location" size={32} color={colors.primary} />
          </View>
        ))}
      </ImageBackground>

      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Tìm sự kiện, địa điểm...</Text>
        </View>
        <TouchableOpacity style={styles.roundBtn}>
          <Ionicons name="options-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Thẻ sự kiện nổi phía dưới, giống mockup Map View */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('EventDetails', { event: focusedEvent })}
      >
        <Image source={{ uri: focusedEvent.image }} style={styles.cardImage} />
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.cardTitle} numberOfLines={1}>{focusedEvent.title}</Text>
          <Text style={styles.cardSub} numberOfLines={1}>{focusedEvent.location}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  map: { flex: 1 },
  pin: { position: 'absolute' },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, height: 44, borderRadius: radius.lg, paddingHorizontal: spacing.md, marginHorizontal: spacing.sm },
  searchPlaceholder: { color: colors.textSecondary, marginLeft: spacing.sm, fontSize: fontSize.sm },
  card: { position: 'absolute', bottom: spacing.lg, left: spacing.md, right: spacing.md, backgroundColor: colors.white, borderRadius: radius.lg, padding: spacing.sm, flexDirection: 'row', alignItems: 'center', elevation: 4 },
  cardImage: { width: 56, height: 56, borderRadius: radius.md },
  cardTitle: { fontWeight: '700', color: colors.textPrimary },
  cardSub: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: 2 },
});
