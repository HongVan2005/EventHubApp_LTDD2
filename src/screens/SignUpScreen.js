// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import ScreenHeader from '../components/ScreenHeader';
import { colors, fontSize, spacing } from '../theme/colors';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không trùng khớp!');
      return;
    }

    try {
      const existingUsersStr = await AsyncStorage.getItem('registered_users');
      const users = existingUsersStr ? JSON.parse(existingUsersStr) : [];

      const isExist = users.some((u) => u.email.toLowerCase() === email.toLowerCase().trim());
      if (isExist) {
        Alert.alert('Lỗi', 'Email này đã được đăng ký tài khoản!');
        return;
      }

      // Tạo mã OTP ngẫu nhiên 4 chữ số (Ví dụ: 1234)
      const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

      // Lưu tài khoản tạm thời + mã OTP
      const tempUser = { name, email: email.toLowerCase().trim(), password, otp: generatedOtp };
      await AsyncStorage.setItem('temp_user', JSON.stringify(tempUser));

      // Hiển thị mã OTP để test
      Alert.alert(
        'Mã OTP của bạn',
        `Mã xác nhận gửi tới ${email} là: ${generatedOtp}`,
        [{ text: 'Nhập OTP', onPress: () => navigation.navigate('Verification', { email }) }]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tạo tài khoản.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Sign up</Text>

        <AppInput icon="person-outline" placeholder="Your name" value={name} onChangeText={setName} style={styles.field} />
        <AppInput icon="mail-outline" placeholder="abc@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.field} />
        <AppInput icon="lock-closed-outline" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.field} />
        <AppInput icon="lock-closed-outline" placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.field} />

        <AppButton title="SIGN UP" showArrow onPress={handleSignUp} style={{ marginTop: spacing.lg }} />

        <View style={styles.signinRow}>
          <Text style={styles.signinText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  heading: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.lg },
  field: { marginBottom: spacing.md },
  signinRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  signinText: { color: colors.textSecondary },
  signinLink: { color: colors.primary, fontWeight: '700' },
});