// ============================================================
// 6. SIGN UP - Màn hình đăng ký tài khoản mới
// ============================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import ScreenHeader from '../components/ScreenHeader';
import { colors, fontSize, spacing } from '../theme/colors';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Sau khi đăng ký, chuyển sang màn hình xác thực OTP
    navigation.navigate('Verification');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Sign up</Text>

        <AppInput icon="person-outline" placeholder="Your name" value={name} onChangeText={setName} style={styles.field} />
        <AppInput icon="mail-outline" placeholder="abc@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.field} />
        <AppInput icon="lock-closed-outline" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.field} />
        <AppInput icon="lock-closed-outline" placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.field} />

        <AppButton title="SIGN UP" showArrow onPress={handleSignUp} style={{ marginTop: spacing.lg }} />

        <Text style={styles.orText}>OR</Text>

        <AppButton title="Login with Google" variant="social" icon="logo-google" onPress={handleSignUp} style={{ marginBottom: spacing.md }} />
        <AppButton title="Login with Facebook" variant="social" icon="logo-facebook" onPress={handleSignUp} />

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
  orText: { textAlign: 'center', color: colors.textSecondary, marginVertical: spacing.lg, fontWeight: '600' },
  signinRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  signinText: { color: colors.textSecondary },
  signinLink: { color: colors.primary, fontWeight: '700' },
});
