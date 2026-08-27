// ============================================================
// DRAWER NAVIGATOR - Menu trượt từ bên trái, bọc quanh Bottom Tabs
// Nội dung menu được tuỳ chỉnh bằng MenuScreen (drawerContent)
// ============================================================
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import MenuScreen from '../screens/MenuScreen';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: '78%' } }}
      drawerContent={(props) => <MenuScreen {...props} />}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
}
