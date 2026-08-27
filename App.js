// ============================================================
// APP.JS - Điểm khởi chạy chính của ứng dụng EventHub
// ============================================================
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    // GestureHandlerRootView bắt buộc phải bọc ngoài cùng để Drawer
    // và các thao tác vuốt hoạt động chính xác trên cả Android & iOS
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
