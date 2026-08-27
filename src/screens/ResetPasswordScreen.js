// ============================================================
// 8. RESET PASSWORD - Màn hình quên/đặt lại mật khẩu
// ============================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { colors, fontSize, spacing } from '../theme/colors';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    // Demo: sau khi gửi yêu cầu, chuyển sang màn hình xác thực OTP
    navigation.navigate('Verification');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.heading}>Reset Password</Text>
        <Text style={styles.subText}>
          Nhập email đã đăng ký tài khoản của bạn, chúng tôi sẽ gửi mã xác thực để bạn đặt lại mật khẩu.
        </Text>

        <AppInput icon="mail-outline" placeholder="abc@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" style={{ marginBottom: spacing.lg }} />

        <AppButton title="SEND" onPress={handleSend} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: spacing.lg },
  heading: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.sm },
  subText: { color: colors.textSecondary, fontSize: fontSize.sm, lineHeight: 20, marginBottom: spacing.xl },
});
