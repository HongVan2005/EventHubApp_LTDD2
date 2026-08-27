// src/navigation/MainDrawer.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import MainTabNavigator from './MainTabNavigator'; 
import { ThemeContext } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext?.themeColors || {
    background: '#FFFFFF',
    textPrimary: '#120D26',
    textSecondary: '#747688',
    border: '#E4E6EB',
    primary: '#5669FF',
  };

  const [user, setUser] = useState({
    name: 'Nguyễn Thị Hồng Vân',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Thi+Hong+Van&background=5669FF&color=fff&size=256'
  });

  const drawerItems = [
    { id: '1', label: t('profile') || 'My Profile', icon: 'person-outline', screen: 'MyProfile' },
    { id: '2', label: t('messages') || 'Message', icon: 'chatbubble-outline', screen: 'Message' },
    { id: '3', label: 'Calendar', icon: 'calendar-outline', screen: 'SeeAllEvents' },
    { id: '4', label: 'Bookmark', icon: 'bookmark-outline', screen: 'Events' },
    { id: '5', label: t('accountManager') || 'Account Manager', icon: 'people-outline', screen: 'AccountManager' },
    { id: '6', label: 'Contact Us', icon: 'call-outline', screen: 'InviteFriend' },
    { id: '7', label: t('settings') || 'Settings', icon: 'settings-outline', screen: 'Settings' },
    { id: '8', label: 'Help & FAQ', icon: 'help-circle-outline', screen: 'Notification' },
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('user_profile');
        if (savedData !== null) {
          const data = JSON.parse(savedData);
          const userName = data.name || 'Nguyễn Thị Hồng Vân';
          let userAvatar = data.avatar || '';

          if (!userAvatar && data.email) {
            const usersStr = await AsyncStorage.getItem('registered_users');
            if (usersStr) {
              const users = JSON.parse(usersStr);
              const matched = users.find((u) => u.email && u.email.toLowerCase().trim() === data.email.toLowerCase().trim());
              if (matched && matched.avatar) {
                userAvatar = matched.avatar;
              }
            }
          }

          const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=5669FF&color=fff&size=256`;

          setUser({
            name: userName,
            avatar: userAvatar || fallbackAvatar
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    const unsubscribe = props.navigation.addListener('state', () => {
      loadUserData();
    });

    loadUserData();
    return unsubscribe;
  }, [props.navigation]);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Sign Out', 
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          props.navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
        }
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: themeColors.background }}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.profileHeader} 
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('MyProfile');
          }}
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={[styles.userName, { color: themeColors.textPrimary }]}>{user.name}</Text>
          <Text style={[styles.userSub, { color: themeColors.textSecondary }]}>120 Followers · 260 Following</Text>
        </TouchableOpacity>

        <View style={styles.menuList}>
          {drawerItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate(item.screen);
              }}
            >
              <Ionicons name={item.icon} size={22} color={themeColors.textPrimary} style={styles.icon} />
              <Text style={[styles.menuLabel, { color: themeColors.textPrimary }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('AccountManager');
            }}
          >
            <Ionicons name="swap-horizontal-outline" size={22} color="#5669FF" style={styles.icon} />
            <Text style={[styles.menuLabel, { color: '#5669FF' }]}>{t('switchAccount') || 'Switch Account'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color="#F56B3F" style={styles.icon} />
            <Text style={[styles.menuLabel, { color: '#F56B3F' }]}>{t('signOut') || 'Sign Out'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: '75%' },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  profileHeader: { paddingHorizontal: 20, marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 12 },
  userName: { fontSize: 18, fontWeight: '700' },
  userSub: { fontSize: 12, marginTop: 4 },
  menuList: { paddingHorizontal: 12, marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 8 },
  icon: { marginRight: 16 },
  menuLabel: { fontSize: 15, fontWeight: '500' },
});