// ============================================================
// BOTTOM TAB NAVIGATOR - Thanh điều hướng dưới cùng gồm
// Explore (Home) - Events - Map - Profile
// ============================================================
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import MapViewScreen from '../screens/MapViewScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import TabBarIcon from '../components/TabBarIcon';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 64, paddingTop: 6, backgroundColor: colors.white },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="compass-outline" label="Explore" focused={focused} /> }}
      />
      <Tab.Screen
        name="EventsTab"
        component={EventsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="calendar-outline" label="Events" focused={focused} /> }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapViewScreen}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="map-outline" label="Map" focused={focused} /> }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={MyProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <TabBarIcon name="person-outline" label="Profile" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}
