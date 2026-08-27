// ============================================================
// ROOT NAVIGATOR - Stack điều hướng gốc của toàn bộ ứng dụng
// Bao gồm: Splash -> Onboarding -> Auth -> Main (Drawer + Tabs)
// và các màn hình con khác (chi tiết, chỉnh sửa cá nhân, nhắn tin, quản lý tài khoản, cài đặt...)
// ============================================================
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import Onboarding1Screen from '../screens/Onboarding1Screen';
import Onboarding2Screen from '../screens/Onboarding2Screen';
import Onboarding3Screen from '../screens/Onboarding3Screen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MainDrawer from './MainDrawer';
import EventsScreen from '../screens/EventsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import MapViewScreen from '../screens/MapViewScreen';
import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import AccountManagerScreen from '../screens/AccountManagerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OrganizerProfileScreen from '../screens/OrganizerProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import InviteFriendScreen from '../screens/InviteFriendScreen';
import ShareScreen from '../screens/ShareScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* Nhóm màn hình mở đầu */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
        <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
        <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />

        {/* Nhóm màn hình xác thực người dùng */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        {/* Khu vực chính của ứng dụng (Drawer + Bottom Tabs) */}
        <Stack.Screen name="MainDrawer" component={MainDrawer} />

        {/* Màn hình Danh sách tất cả sự kiện */}
        <Stack.Screen name="SeeAllEvents" component={EventsScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />

        {/* Các màn hình con điều hướng từ khu vực chính */}
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="MapView" component={MapViewScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="AccountManager" component={AccountManagerScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="InviteFriend" component={InviteFriendScreen} />
        <Stack.Screen name="Share" component={ShareScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}