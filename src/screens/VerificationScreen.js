// src/screens/VerificationScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenHeader from '../components/ScreenHeader';
import AppButton from '../components/AppButton';
import { colors, fontSize, spacing, radius } from '../theme/colors';

export default function VerificationScreen({ route, navigation }) {
  const email = route.params?.email || 'email@example.com';
  const [code, setCode] = useState(['', '', '', '']);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleVerify = async () => {
    const enteredOtp = code.join('');
    if (enteredOtp.length < 4) {
      Alert.alert('Thông báo', 'Vui lòng nhập đủ 4 chữ số OTP!');
      return;
    }

    try {
      const tempUserStr = await AsyncStorage.getItem('temp_user');
      if (!tempUserStr) {
        Alert.alert('Lỗi', 'Không tìm thấy dữ liệu đăng ký!');
        return;
      }

      const tempUser = JSON.parse(tempUserStr);

      // Kiểm tra mã OTP nhập vào có trùng với OTP đã tạo không
      if (enteredOtp === tempUser.otp) {
        // Lấy danh sách tài khoản cũ và lưu tài khoản mới
        const existingUsersStr = await AsyncStorage.getItem('registered_users');
        const users = existingUsersStr ? JSON.parse(existingUsersStr) : [];

        users.push({
          name: tempUser.name,
          email: tempUser.email,
          password: tempUser.password,
        });

        await AsyncStorage.setItem('registered_users', JSON.stringify(users));
        await AsyncStorage.removeItem('temp_user');

        Alert.alert('Thành công', 'Xác thực tài khoản thành công! Hãy đăng nhập.', [
          { text: 'OK', onPress: () => navigation.navigate('SignIn') },
        ]);
      } else {
        Alert.alert('Xác thực thất bại', 'Mã OTP không chính xác!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xác thực.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.heading}>Verification</Text>
        <Text style={styles.subText}>We’ve send you the verification code on {email}</Text>

        <View style={styles.codeRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              style={styles.codeBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
            />
          ))}
        </View>

        <AppButton title="CONTINUE" showArrow onPress={handleVerify} style={{ marginTop: spacing.xl }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: spacing.lg },
  heading: { fontSize: fontSize.xl, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.xs },
  subText: { color: colors.textSecondary, marginBottom: spacing.xl, lineHeight: 20 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  codeBox: { width: 56, height: 56, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, textAlign: 'center', fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
});