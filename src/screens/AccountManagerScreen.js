// src/screens/AccountManagerScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import { colors, fontSize, spacing, radius } from '../theme/colors';

export default function AccountManagerScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [activeEmail, setActiveEmail] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const usersStr = await AsyncStorage.getItem('registered_users');
      const loadedUsers = usersStr ? JSON.parse(usersStr) : [];
      setUsers(loadedUsers);

      const activeUserStr = await AsyncStorage.getItem('user_profile');
      if (activeUserStr) {
        const activeUser = JSON.parse(activeUserStr);
        setActiveEmail(activeUser.email || '');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Chuyển đổi sang đăng nhập tài khoản được chọn (Đồng bộ Avatar & Bio chuẩn)
  const handleSwitchAccount = async (user) => {
    try {
      await AsyncStorage.setItem('userToken', 'mock_token_123456');
      await AsyncStorage.setItem(
        'user_profile',
        JSON.stringify({
          name: user.name,
          email: user.email,
          bio: user.bio || '',
          avatar: user.avatar || 'https://i.pravatar.cc/300?img=12',
        })
      );

      Alert.alert('Thành công', `Đã chuyển sang tài khoản: ${user.name}`, [
        {
          text: 'OK',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MainDrawer' }] }),
        },
      ]);
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể chuyển tài khoản.');
    }
  };

  // Xóa tài khoản khỏi danh sách
  const handleDeleteAccount = (emailToDelete) => {
    Alert.alert('Xác nhận xóa', `Bạn có chắc muốn xóa tài khoản ${emailToDelete}?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const updatedUsers = users.filter((u) => u.email !== emailToDelete);
          setUsers(updatedUsers);
          await AsyncStorage.setItem('registered_users', JSON.stringify(updatedUsers));

          if (emailToDelete === activeEmail) {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('user_profile');
            navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Quản lý Tài khoản" onBack={() => navigation.goBack()} />

      <View style={styles.infoBox}>
        <Ionicons name="people-circle-outline" size={28} color={colors.primary} />
        <Text style={styles.infoText}>
          Hiện có <Text style={styles.highlight}>{users.length}</Text> tài khoản đã đăng ký trên máy này.
        </Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => {
          const isActive = item.email && activeEmail && item.email.toLowerCase() === activeEmail.toLowerCase();

          return (
            <View style={[styles.card, isActive && styles.activeCard]}>
              <Image
                source={{ uri: item.avatar || 'https://i.pravatar.cc/300?img=12' }}
                style={styles.avatar}
              />
              <View style={styles.cardInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.userName}>{item.name}</Text>
                  {isActive && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>Đang dùng</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>

              {!isActive && (
                <TouchableOpacity style={styles.switchBtn} onPress={() => handleSwitchAccount(item)}>
                  <Text style={styles.switchText}>Đăng nhập</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDeleteAccount(item.email)}>
                <Ionicons name="trash-outline" size={20} color="#F56B3F" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.addAccountBtn}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
        <Text style={styles.addAccountText}>Đăng ký tài khoản mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryLight, padding: spacing.md, margin: spacing.md, borderRadius: radius.md },
  infoText: { marginLeft: spacing.sm, color: colors.textPrimary, fontSize: fontSize.sm },
  highlight: { fontWeight: '800', color: colors.primary },
  card: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.background, borderRadius: radius.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  activeCard: { borderColor: colors.primary, backgroundColor: '#F0F2FF' },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  cardInfo: { flex: 1, marginLeft: spacing.md },
  userName: { fontSize: fontSize.md, fontWeight: '700', color: colors.textPrimary },
  userEmail: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  badge: { backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  switchBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radius.full, marginRight: 8 },
  switchText: { color: colors.white, fontSize: fontSize.xs, fontWeight: '700' },
  deleteBtn: { padding: 6 },
  addAccountBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  addAccountText: { marginLeft: 8, color: colors.primary, fontWeight: '700', fontSize: fontSize.md },
});