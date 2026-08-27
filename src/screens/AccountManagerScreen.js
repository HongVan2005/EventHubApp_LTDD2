// src/screens/AccountManagerScreen.js
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import { colors, fontSize, spacing, radius } from '../theme/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function AccountManagerScreen({ navigation }) {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext?.themeColors || {
    background: colors.white,
    surface: colors.background,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.border,
    primary: colors.primary,
  };

  const [users, setUsers] = useState([]);
  const [activeEmail, setActiveEmail] = useState('');
  const [activeAvatar, setActiveAvatar] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const getValidAvatar = (user, currentActiveEmail, currentActiveAvatar) => {
    // Nếu đây là tài khoản đang dùng và có activeAvatar mới đổi
    if (
      user.email &&
      currentActiveEmail &&
      user.email.toLowerCase().trim() === currentActiveEmail.toLowerCase().trim() &&
      currentActiveAvatar &&
      !currentActiveAvatar.includes('pravatar.cc')
    ) {
      return currentActiveAvatar;
    }

    // Nếu user trong danh sách có avatar riêng
    if (user.avatar && !user.avatar.includes('pravatar.cc')) {
      return user.avatar;
    }

    // Fallback tạo avatar chuẩn theo tên người dùng
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=5669FF&color=fff&size=256`;
  };

  const loadData = async () => {
    try {
      const activeUserStr = await AsyncStorage.getItem('user_profile');
      let currentEmail = '';
      let currentAvatar = '';

      if (activeUserStr) {
        const activeUser = JSON.parse(activeUserStr);
        currentEmail = activeUser.email || '';
        currentAvatar = activeUser.avatar || '';
        setActiveEmail(currentEmail);
        setActiveAvatar(currentAvatar);
      }

      const usersStr = await AsyncStorage.getItem('registered_users');
      const loadedUsers = usersStr ? JSON.parse(usersStr) : [];
      setUsers(loadedUsers);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSwitchAccount = async (user) => {
    try {
      const userAvatar = getValidAvatar(user, activeEmail, activeAvatar);

      await AsyncStorage.setItem('userToken', 'mock_token_123456');
      await AsyncStorage.setItem(
        'user_profile',
        JSON.stringify({
          name: user.name,
          email: user.email,
          bio: user.bio || '',
          avatar: userAvatar,
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
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScreenHeader title="Quản lý Tài khoản" onBack={() => navigation.goBack()} />

      <View style={[styles.infoBox, { backgroundColor: themeColors.surface }]}>
        <Ionicons name="people-circle-outline" size={28} color={themeColors.primary} />
        <Text style={[styles.infoText, { color: themeColors.textPrimary }]}>
          Hiện có <Text style={[styles.highlight, { color: themeColors.primary }]}>{users.length}</Text> tài khoản đã đăng ký trên máy này.
        </Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => {
          const isActive = item.email && activeEmail && item.email.toLowerCase().trim() === activeEmail.toLowerCase().trim();
          const avatarUrl = getValidAvatar(item, activeEmail, activeAvatar);

          return (
            <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }, isActive && styles.activeCard]}>
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              <View style={styles.cardInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.userName, { color: themeColors.textPrimary }]}>{item.name}</Text>
                  {isActive && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>Đang dùng</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.userEmail, { color: themeColors.textSecondary }]}>{item.email}</Text>
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

      <TouchableOpacity style={styles.addAccountBtn} onPress={() => navigation.navigate('SignUp')}>
        <Ionicons name="add-circle-outline" size={22} color={themeColors.primary} />
        <Text style={[styles.addAccountText, { color: themeColors.primary }]}>Đăng ký tài khoản mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  infoBox: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, margin: spacing.md, borderRadius: radius.md },
  infoText: { marginLeft: spacing.sm, fontSize: fontSize.sm },
  highlight: { fontWeight: '800' },
  card: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.md, borderWidth: 1 },
  activeCard: { borderColor: '#5669FF' },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  cardInfo: { flex: 1, marginLeft: spacing.md },
  userName: { fontSize: fontSize.md, fontWeight: '700' },
  userEmail: { fontSize: fontSize.xs, marginTop: 2 },
  badge: { backgroundColor: '#5669FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  switchBtn: { backgroundColor: '#5669FF', paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radius.full, marginRight: 8 },
  switchText: { color: '#FFFFFF', fontSize: fontSize.xs, fontWeight: '700' },
  deleteBtn: { padding: 6 },
  addAccountBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: spacing.md, borderTopWidth: 1, borderTopColor: '#E4E6EB' },
  addAccountText: { marginLeft: 8, fontWeight: '700', fontSize: fontSize.md },
});