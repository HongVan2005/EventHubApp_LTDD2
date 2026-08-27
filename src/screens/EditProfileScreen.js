// src/screens/EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('Ashfak Sayem');
  const [bio, setBio] = useState('Yêu thích du lịch và âm nhạc. Thường xuyên tổ chức các buổi gặp gỡ.');
  const [email, setEmail] = useState('ashfak@gmail.com');
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/300?img=12');
  const [loading, setLoading] = useState(false);

  // Tải dữ liệu đã lưu từ bộ nhớ máy khi mở màn hình
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('user_profile');
      if (savedProfile !== null) {
        const data = JSON.parse(savedProfile);
        if (data.name) setName(data.name);
        if (data.bio) setBio(data.bio);
        if (data.email) setEmail(data.email);
        if (data.avatar) setAvatar(data.avatar);
      }
    } catch (error) {
      console.log('Lỗi khi tải dữ liệu cá nhân:', error);
    }
  };

  // Chọn ảnh từ thư viện điện thoại
  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Thông báo', 'Bạn cần cấp quyền truy cập thư viện để đổi ảnh đại diện!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  // Lưu thông tin vĩnh viễn vào AsyncStorage
  const handleSave = async () => {
    setLoading(true);
    try {
      const profileData = { name, bio, email, avatar };
      await AsyncStorage.setItem('user_profile', JSON.stringify(profileData));
      
      Alert.alert('Thành công', 'Thông tin cá nhân đã được lưu thành công!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu cá nhân.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#120D26" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* AVATAR + CHỌN ẢNH */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
            <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <AppInput icon="person-outline" value={name} onChangeText={setName} style={styles.field} />

        <Text style={styles.label}>Email</Text>
        <AppInput icon="mail-outline" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.field} />

        <Text style={styles.label}>About Me</Text>
        <AppInput icon="information-circle-outline" value={bio} onChangeText={setBio} multiline style={styles.field} />

        {loading ? (
          <ActivityIndicator size="large" color="#5669FF" style={{ marginTop: 20 }} />
        ) : (
          <AppButton title="SAVE CHANGES" onPress={handleSave} style={{ marginTop: 20 }} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#120D26' },
  scroll: { padding: 20 },
  avatarContainer: { alignSelf: 'center', marginBottom: 24, position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#5669FF', width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  label: { fontSize: 14, fontWeight: '600', color: '#120D26', marginBottom: 8, marginTop: 12 },
  field: { marginBottom: 8 },
});