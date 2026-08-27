// ============================================================
// 9. MENU (SIDE DRAWER) - Menu điều hướng trượt từ bên trái
// Được dùng làm nội dung tuỳ chỉnh cho Drawer Navigator
// ============================================================
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { currentUser } from '../data/mockData';
import { colors, fontSize, spacing } from '../theme/colors';

// Danh sách mục menu, mỗi mục ứng với 1 icon + tên màn hình cần điều hướng tới
const menuItems = [
  { icon: 'person-outline', label: 'My Profile', route: 'MyProfile' },
  { icon: 'chatbubble-outline', label: 'Message', route: null },
  { icon: 'calendar-outline', label: 'Calendar', route: null },
  { icon: 'bookmark-outline', label: 'Bookmark', route: null },
  { icon: 'call-outline', label: 'Contact Us', route: null },
  { icon: 'settings-outline', label: 'Settings', route: null },
  { icon: 'help-circle-outline', label: 'Help & FAQ', route: null },
];

export default function MenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        {/* Thông tin người dùng hiện tại */}
        <TouchableOpacity style={styles.profileRow} onPress={() => navigation.navigate('MyProfile')}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <View style={{ marginLeft: spacing.md }}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.subInfo}>
              {currentUser.followers} Followers · {currentUser.following} Following
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => item.route && navigation.navigate(item.route)}
          >
            <Ionicons name={item.icon} size={20} color={colors.textPrimary} />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={[styles.menuLabel, { color: colors.danger }]}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  profileRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  name: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
  subInfo: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: spacing.sm },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: spacing.lg },
  menuLabel: { marginLeft: spacing.md, fontSize: fontSize.md, color: colors.textPrimary, fontWeight: '500' },
});
