// src/screens/EditProfileScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { ThemeContext } from '../context/ThemeContext';

export default function EditProfileScreen({ navigation }) {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext?.themeColors || {
    background: '#FFFFFF',
    textPrimary: '#120D26',
    textSecondary: '#747688',
    border: '#E4E6EB',
    primary: '#5669FF',
  };

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('user_profile');
      if (savedProfile !== null) {
        const data = JSON.parse(savedProfile);
        setName(data.name || '');
        setBio(data.bio || '');
        setEmail(data.email || '');
        setAvatar(data.avatar || '');
      }
    } catch (error) {
      console.log('Lỗi khi tải dữ liệu cá nhân:', error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Thông báo', 'Bạn cần cấp quyền truy cập thư viện!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setAvatar(base64Image);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const profileData = { name, bio, email, avatar };

      // 1. Lưu thông tin tài khoản đang phiên đăng nhập
      await AsyncStorage.setItem('user_profile', JSON.stringify(profileData));

      // 2. Cập nhật đồng bộ vào danh sách tất cả tài khoản
      const usersStr = await AsyncStorage.getItem('registered_users');
      if (usersStr) {
        let users = JSON.parse(usersStr);
        users = users.map((u) => {
          if (
            (email && u.email && u.email.toLowerCase().trim() === email.toLowerCase().trim()) ||
            (!email && u.name && u.name.toLowerCase().trim() === name.toLowerCase().trim())
          ) {
            return { ...u, name, bio, avatar };
          }
          return u;
        });
        await AsyncStorage.setItem('registered_users', JSON.stringify(users));
      }

      Alert.alert('Thành công', 'Thông tin cá nhân đã được lưu vĩnh viễn!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu cá nhân.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=5669FF&color=fff`,
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={[styles.cameraBtn, { backgroundColor: themeColors.primary }]} onPress={pickImage}>
            <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { color: themeColors.textPrimary }]}>Full Name</Text>
        <AppInput icon="person-outline" value={name} onChangeText={setName} style={styles.field} />

        <Text style={[styles.label, { color: themeColors.textPrimary }]}>Email</Text>
        <AppInput icon="mail-outline" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.field} editable={false} />

        <Text style={[styles.label, { color: themeColors.textPrimary }]}>About Me</Text>
        <AppInput icon="information-circle-outline" value={bio} onChangeText={setBio} multiline style={styles.field} />

        {loading ? (
          <ActivityIndicator size="large" color={themeColors.primary} style={{ marginTop: 20 }} />
        ) : (
          <AppButton title="SAVE CHANGES" onPress={handleSave} style={{ marginTop: 20 }} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scroll: { padding: 20 },
  avatarContainer: { alignSelf: 'center', marginBottom: 24, position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 12 },
  field: { marginBottom: 8 },
});