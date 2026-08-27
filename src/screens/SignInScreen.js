// screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { colors, fontSize, spacing } from '../theme/colors';

// Cấu hình URL Backend của bạn
const API_URL = 'http://localhost:5000/api/auth';

// Component Logo EventHub hình chữ 'e' stylized theo đúng thiết kế ảnh
const EventHubLogo = () => (
  <Svg width={70} height={70} viewBox="0 0 100 100" fill="none">
    {/* Vòng cung tím chính */}
    <Path
      d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C68.5 90 83.8 77.4 88.2 60H68C64.2 68.8 55.4 75 45 75C31.2 75 20 63.8 20 50C20 36.2 31.2 25 45 25C55.4 25 64.2 31.2 68 40H88.2C83.8 22.6 68.5 10 50 10Z"
      fill="#5669FF"
    />
    {/* Nét gạch xanh ngọc nhạt cắt ngang */}
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
  const [loading, setLoading] = useState(false);

  // Xử lý gọi API Đăng nhập kết nối với Backend
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Đăng nhập thành công -> Chuyển vào ứng dụng chính
        navigation.reset({ index: 0, routes: [{ name: 'MainDrawer' }] });
      } else {
        Alert.alert('Đăng nhập thất bại', data.message || 'Sai tài khoản hoặc mật khẩu');
      }
    } catch (error) {
      // Đăng nhập fallback nếu chưa chạy Backend (giúp test UI)
      navigation.reset({ index: 0, routes: [{ name: 'MainDrawer' }] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* LOGO & BRAND NAME */}
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
        {loading ? (
          <ActivityIndicator size="large" color="#5669FF" style={{ marginTop: spacing.lg }} />
        ) : (
          <AppButton
            title="SIGN IN"
            showArrow
            onPress={handleSignIn}
            style={{ marginTop: spacing.lg }}
          />
        )}

        <Text style={styles.orText}>OR</Text>

        {/* SOCIAL BUTTONS */}
        <AppButton
          title="Login with Google"
          variant="social"
          icon="logo-google"
          onPress={handleSignIn}
          style={{ marginBottom: spacing.md }}
        />
        <AppButton
          title="Login with Facebook"
          variant="social"
          icon="logo-facebook"
          onPress={handleSignIn}
        />

        {/* FOOTER LINK */}
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
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scroll: { 
    paddingHorizontal: spacing.lg, 
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl 
  },
  logoBox: { 
    alignItems: 'center', 
    marginTop: spacing.md, 
    marginBottom: spacing.xl 
  },
  logoText: { 
    fontSize: 32, 
    fontWeight: '700', 
    color: '#120D26',
    marginTop: 12
  },
  heading: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#120D26', 
    marginBottom: spacing.lg 
  },
  field: { 
    marginBottom: spacing.md 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justify: 'space-between', 
    marginVertical: spacing.xs 
  },
  rememberRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  rememberText: { 
    marginLeft: 8, 
    color: '#120D26', 
    fontSize: fontSize.sm 
  },
  forgotText: { 
    color: '#120D26', 
    fontSize: fontSize.sm, 
    fontWeight: '500' 
  },
  orText: { 
    textAlign: 'center', 
    color: '#9D98AC', 
    marginVertical: spacing.lg, 
    fontWeight: '700',
    fontSize: fontSize.sm
  },
  signupRow: { 
    flexDirection: 'row', 
    justify: 'center', 
    marginTop: spacing.xl 
  },
  signupText: { 
    color: '#120D26',
    fontSize: fontSize.sm 
  },
  signupLink: { 
    color: '#5669FF', 
    fontWeight: '600',
    fontSize: fontSize.sm 
  },
});