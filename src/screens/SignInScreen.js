// src/screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { colors, fontSize, spacing } from '../theme/colors';

// Logo SVG EventHub chuẩn giao diện gốc
const EventHubLogo = () => (
  <Svg width={70} height={70} viewBox="0 0 100 100" fill="none">
    <Path
      d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C68.5 90 83.8 77.4 88.2 60H68C64.2 68.8 55.4 75 45 75C31.2 75 20 63.8 20 50C20 36.2 31.2 25 45 25C55.4 25 64.2 31.2 68 40H88.2C83.8 22.6 68.5 10 50 10Z"
      fill="#5669FF"
    />
    <Path
      d="M38 43H85C87.7614 43 90 45.2386 90 48V52C90 54.7614 87.7614 57 85 57H38C35.2386 57 33 54.7614 33 52V48C33 45.2386 35.2386 43 38 43Z"
      fill="#00F0FF"
      transform="rotate(-20 60 50)"
    />
  </Svg>
);

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập Email và Mật khẩu.');
      return;
    }

    try {
      // 1. Lấy danh sách tài khoản đã đăng ký trong máy
      const existingUsersStr = await AsyncStorage.getItem('registered_users');
      const users = existingUsersStr ? JSON.parse(existingUsersStr) : [];

      // 2. Tìm tài khoản khớp cả Email và Mật khẩu
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
      );

      if (matchedUser) {
        // Lưu thông tin tài khoản phiên đăng nhập
        if (rememberMe) {
          await AsyncStorage.setItem('userToken', 'mock_token_123456');
          await AsyncStorage.setItem(
            'user_profile',
            JSON.stringify({ name: matchedUser.name, email: matchedUser.email })
          );
        }

        navigation.reset({ index: 0, routes: [{ name: 'MainDrawer' }] });
      } else {
        Alert.alert('Đăng nhập thất bại', 'Email hoặc Mật khẩu không chính xác!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xác thực tài khoản.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* LOGO BRAND */}
        <View style={styles.logoBox}>
          <EventHubLogo />
          <Text style={styles.logoText}>EventHub</Text>
        </View>

        <Text style={styles.heading}>Sign in</Text>

        {/* INPUT FIELDS */}
        <AppInput
          icon="mail-outline"
          placeholder="abc@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.field}
        />
        <AppInput
          icon="lock-closed-outline"
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.field}
        />

        {/* REMEMBER ME & FORGOT PASSWORD */}
        <View style={styles.row}>
          <View style={styles.rememberRow}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: '#E4E6EB', true: '#5669FF' }}
              thumbColor="#FFFFFF"
            />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* BUTTON SIGN IN */}
        <AppButton
          title="SIGN IN"
          showArrow
          onPress={handleSignIn}
          style={{ marginTop: spacing.lg }}
        />

        <Text style={styles.orText}>OR</Text>

        {/* SOCIAL LOGIN BUTTONS */}
        <AppButton title="Login with Google" variant="social" icon="logo-google" onPress={() => {}} style={{ marginBottom: spacing.md }} />
        <AppButton title="Login with Facebook" variant="social" icon="logo-facebook" onPress={() => {}} />

        {/* SIGN UP LINK */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  logoBox: { alignItems: 'center', marginTop: spacing.xs, marginBottom: spacing.lg },
  logoText: { fontSize: 32, fontWeight: '700', color: '#120D26', marginTop: 8 },
  heading: { fontSize: 24, fontWeight: '700', color: '#120D26', marginBottom: spacing.lg },
  field: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: spacing.xs },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  rememberText: { marginLeft: 8, color: '#120D26', fontSize: fontSize.sm },
  forgotText: { color: '#120D26', fontSize: fontSize.sm, fontWeight: '500' },
  orText: { textAlign: 'center', color: '#9D98AC', marginVertical: spacing.lg, fontWeight: '700', fontSize: fontSize.sm },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  signupText: { color: '#120D26', fontSize: fontSize.sm },
  signupLink: { color: '#5669FF', fontWeight: '600', fontSize: fontSize.sm },
});