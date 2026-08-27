// src/navigation/MainDrawer.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import MainTabNavigator from './MainTabNavigator'; 

const Drawer = createDrawerNavigator();

const drawerItems = [
  { id: '1', label: 'My Profile', icon: 'person-outline', screen: 'MyProfile' },
  { id: '2', label: 'Message', icon: 'chatbubble-outline', screen: 'Message' },
  { id: '3', label: 'Calendar', icon: 'calendar-outline', screen: 'SeeAllEvents' },
  { id: '4', label: 'Bookmark', icon: 'bookmark-outline', screen: 'Events' },
  { id: '5', label: 'Contact Us', icon: 'call-outline', screen: 'InviteFriend' },
  { id: '6', label: 'Settings', icon: 'settings-outline', screen: 'EditProfile' },
  { id: '7', label: 'Help & FAQ', icon: 'help-circle-outline', screen: 'Notification' },
];

function CustomDrawerContent(props) {
  const [user, setUser] = useState({
    name: 'Nguyễn Thị Hồng Vân',
    avatar: 'https://i.pravatar.cc/300?img=12'
  });

  // Load thông tin lưu từ AsyncStorage để cập nhật thanh bên
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('user_profile');
        if (savedData !== null) {
          const data = JSON.parse(savedData);
          setUser({
            name: data.name || 'Nguyễn Thị Hồng Vân',
            avatar: data.avatar || 'https://i.pravatar.cc/300?img=12'
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
        onPress: () => props.navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] }) 
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* HEADER USER */}
        <TouchableOpacity 
          style={styles.profileHeader} 
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('MyProfile');
          }}
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userSub}>120 Followers · 260 Following</Text>
        </TouchableOpacity>

        {/* DANH SÁCH MENU */}
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
              <Ionicons name={item.icon} size={22} color="#120D26" style={styles.icon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {/* NÚT SIGN OUT */}
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color="#F56B3F" style={styles.icon} />
            <Text style={[styles.menuLabel, { color: '#F56B3F' }]}>Sign Out</Text>
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
  userName: { fontSize: 18, fontWeight: '700', color: '#120D26' },
  userSub: { fontSize: 12, color: '#747688', marginTop: 4 },
  menuList: { paddingHorizontal: 12, marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 8 },
  icon: { marginRight: 16 },
  menuLabel: { fontSize: 15, fontWeight: '500', color: '#120D26' },
});