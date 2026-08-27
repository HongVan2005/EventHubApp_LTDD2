// src/navigation/MainTabNavigator.js
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import MapViewScreen from '../screens/MapViewScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import { ThemeContext } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { themeColors, t } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#5669FF',
        tabBarInactiveTintColor: themeColors.textSecondary,
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopColor: themeColors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'compass-outline';
          else if (route.name === 'Events') iconName = 'calendar-outline';
          else if (route.name === 'Map') iconName = 'map-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('tabHome') }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ tabBarLabel: t('tabEvents') }} />
      <Tab.Screen name="Map" component={MapViewScreen} options={{ tabBarLabel: t('tabMap') }} />
      <Tab.Screen name="Profile" component={MyProfileScreen} options={{ tabBarLabel: t('tabProfile') }} />
    </Tab.Navigator>
  );
}