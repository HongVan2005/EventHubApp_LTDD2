// ============================================================
// APP.JS - Điểm khởi chạy chính của ứng dụng EventHub
// Tích hợp: GestureHandler, SafeArea, Dark/Light Theme Context & i18n
// ============================================================
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Nạp cấu hình đa ngôn ngữ (Tiếng Việt, Tiếng Anh, Tiếng Nhật, Tiếng Hàn)
import './src/i18n/i18n';

// Provider quản lý Giao diện Sáng / Tối (Dark/Light Theme)
import { ThemeProvider } from './src/context/ThemeContext';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    // GestureHandlerRootView bắt buộc phải bọc ngoài cùng để Drawer
    // và các thao tác vuốt hoạt động chính xác trên cả Android & iOS
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}