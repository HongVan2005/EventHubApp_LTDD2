// ============================================================
// 5. SIGN IN - Màn hình đăng nhập
// ============================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { colors, fontSize, spacing } from '../theme/colors';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Xử lý đăng nhập demo: chỉ cần có email & password là coi như thành công
  const handleSignIn = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainDrawer' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoBox}>
          <View style={styles.logoCircle} />
          <Text style={styles.logoText}>EventHub</Text>
        </View>

        <Text style={styles.heading}>Sign in</Text>

        <AppInput icon="mail-outline" placeholder="abc@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.field} />
        <AppInput icon="lock-closed-outline" placeholder="Your password" value={password} onChangeText={setPassword} secureTextEntry style={styles.field} />

        <View style={styles.row}>
          <View style={styles.rememberRow}>
            <Switch value={rememberMe} onValueChange={setRememberMe} trackColor={{ true: colors.primary }} />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <AppButton title="SIGN IN" showArrow onPress={handleSignIn} style={{ marginTop: spacing.lg }} />

        <Text style={styles.orText}>OR</Text>

        <AppButton title="Login with Google" variant="social" icon="logo-google" onPress={handleSignIn} style={{ marginBottom: spacing.md }} />
        <AppButton title="Login with Facebook" variant="social" icon="logo-facebook" onPress={handleSignIn} />

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  logoBox: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.lg },
  logoCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, marginBottom: spacing.sm },
  logoText: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary },
  heading: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.md },
  field: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  rememberText: { marginLeft: spacing.sm, color: colors.textPrimary, fontSize: fontSize.sm },
  forgotText: { color: colors.primary, fontSize: fontSize.sm, fontWeight: '600' },
  orText: { textAlign: 'center', color: colors.textSecondary, marginVertical: spacing.lg, fontWeight: '600' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  signupText: { color: colors.textSecondary },
  signupLink: { color: colors.primary, fontWeight: '700' },
});
