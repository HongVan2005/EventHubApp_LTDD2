// ============================================================
// 7. VERIFICATION - Màn hình xác thực mã OTP gửi qua email/SMS
// ============================================================
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { colors, fontSize, radius, spacing } from '../theme/colors';

const OTP_LENGTH = 4;

export default function VerificationScreen({ navigation }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef([]);

  // Cập nhật giá trị từng ô OTP và tự động chuyển sang ô tiếp theo
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, '').slice(-1);
    setOtp(newOtp);
    if (text && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleContinue = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainDrawer' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.heading}>Verification</Text>
        <Text style={styles.subText}>
          We sent a verification code to your email/phone. Enter the code below to continue.
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity>
          <Text style={styles.resendText}>Didn't receive an OTP? Resend Code</Text>
        </TouchableOpacity>

        <AppButton title="CONTINUE" showArrow onPress={handleContinue} style={{ marginTop: spacing.xl }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: spacing.lg },
  heading: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.sm },
  subText: { color: colors.textSecondary, fontSize: fontSize.sm, lineHeight: 20, marginBottom: spacing.xl },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: 'center',
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  resendText: { color: colors.primary, fontWeight: '600', textAlign: 'center' },
});
