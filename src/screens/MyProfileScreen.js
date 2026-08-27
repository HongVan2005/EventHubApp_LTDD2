// ============================================================
// 17. MY PROFILE - Hồ sơ cá nhân của người dùng hiện tại
// ============================================================
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { currentUser, events } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function MyProfileScreen({ navigation }) {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext?.themeColors || {
    background: colors.white,
    surface: colors.background,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.border,
    primary: colors.primary,
  };

  const [profile, setProfile] = useState({
    name: currentUser.name,
    about: currentUser.about,
    avatar: 'https://i.pravatar.cc/300?img=12',
  });

  // Tự động load dữ liệu mới từ AsyncStorage mỗi khi màn hình Profile được focus
  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          const savedData = await AsyncStorage.getItem('user_profile');
          if (savedData !== null) {
            const data = JSON.parse(savedData);
            setProfile({
              name: data.name || currentUser.name,
              about: data.bio || data.about || currentUser.about,
              avatar: data.avatar || 'https://i.pravatar.cc/300?img=12',
            });
          }
        } catch (error) {
          console.log('Lỗi tải thông tin cá nhân:', error);
        }
      };

      loadProfileData();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        {/* HEADER BAR */}
        <View style={styles.headerRow}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={[styles.roundBtn, { backgroundColor: themeColors.surface }]}
          >
            <Ionicons name="chevron-back" size={22} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>Profile</Text>
          <TouchableOpacity style={[styles.roundBtn, { backgroundColor: themeColors.surface }]}>
            <Ionicons name="ellipsis-horizontal" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileBox}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: themeColors.textPrimary }]}>{profile.name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: themeColors.textPrimary }]}>{currentUser.followers}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Followers</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: themeColors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: themeColors.textPrimary }]}>{currentUser.following}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Following</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.editBtn, { borderColor: themeColors.primary }]} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={[styles.editText, { color: themeColors.primary }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ABOUT ME SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>About Me</Text>
          <Text style={[styles.aboutText, { color: themeColors.textSecondary }]}>{profile.about}</Text>
        </View>

        {/* INTERESTS SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Interest</Text>
          <View style={styles.interestRow}>
            {currentUser.interests.map((it) => (
              <View key={it} style={styles.interestChip}>
                <Text style={styles.interestText}>{it}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* MY EVENTS SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>My Events</Text>
          {events.slice(0, 2).map((ev) => (
            <TouchableOpacity 
              key={ev.id} 
              style={styles.eventRow} 
              onPress={() => navigation.navigate('EventDetails', { event: ev })}
            >
              <Image source={{ uri: ev.image }} style={styles.eventThumb} />
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <Text style={[styles.eventTitle, { color: themeColors.textPrimary }]} numberOfLines={1}>
                  {ev.title}
                </Text>
                <Text style={[styles.eventSub, { color: themeColors.textSecondary }]}>
                  {ev.date} · {ev.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '800' },
  profileBox: { alignItems: 'center', paddingVertical: spacing.md },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: spacing.sm, borderWidth: 3, borderColor: colors.primaryLight },
  name: { fontSize: fontSize.lg, fontWeight: '800' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  statItem: { alignItems: 'center', paddingHorizontal: spacing.lg },
  statNumber: { fontSize: fontSize.md, fontWeight: '800' },
  statLabel: { fontSize: fontSize.xs },
  statDivider: { width: 1, height: 24 },
  editBtn: { marginTop: spacing.md, borderWidth: 1, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: 8 },
  editText: { fontWeight: '700' },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '800', marginBottom: spacing.sm },
  aboutText: { lineHeight: 20 },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap' },
  interestChip: { backgroundColor: colors.primaryLight, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6, marginRight: spacing.sm, marginBottom: spacing.sm },
  interestText: { color: colors.primary, fontWeight: '600', fontSize: fontSize.xs },
  eventRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  eventThumb: { width: 56, height: 56, borderRadius: radius.md },
  eventTitle: { fontWeight: '700' },
  eventSub: { fontSize: fontSize.xs, marginTop: 2 },
});