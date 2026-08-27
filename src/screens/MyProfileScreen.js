// src/screens/MyProfileScreen.js
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
  const { themeColors, t } = useContext(ThemeContext);

  const [profile, setProfile] = useState({ name: '', about: '', avatar: '' });

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [t])
  );

  const loadProfileData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('user_profile');
      let currentAvatar = '';
      let currentName = currentUser.name;
      let currentAbout = '';

      if (savedData !== null) {
        const data = JSON.parse(savedData);
        currentName = data.name || currentUser.name;
        currentAbout = data.bio || t('defaultBio');
        currentAvatar = data.avatar || '';

        if (!currentAvatar && data.email) {
          const usersStr = await AsyncStorage.getItem('registered_users');
          if (usersStr) {
            const users = JSON.parse(usersStr);
            const matched = users.find((u) => u.email && u.email.toLowerCase().trim() === data.email.toLowerCase().trim());
            if (matched && matched.avatar) currentAvatar = matched.avatar;
          }
        }
      }

      const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentName)}&background=5669FF&color=fff&size=256`;

      setProfile({
        name: currentName,
        about: currentAbout || t('defaultBio'),
        avatar: currentAvatar || fallbackAvatar,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const localizedInterests = [t('music'), t('sports'), t('art')];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.roundBtn, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}>
            <Ionicons name="chevron-back" size={22} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>{t('profile')}</Text>
          <TouchableOpacity style={[styles.roundBtn, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}>
            <Ionicons name="ellipsis-horizontal" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileBox}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: themeColors.textPrimary }]}>{profile.name}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: themeColors.textPrimary }]}>{currentUser.followers}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>{t('followers')}</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: themeColors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: themeColors.textPrimary }]}>{currentUser.following}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>{t('following')}</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.editBtn, { borderColor: themeColors.primary, backgroundColor: themeColors.surface }]} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={[styles.editText, { color: themeColors.primary }]}>{t('editProfile')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('aboutMe')}</Text>
          <Text style={[styles.aboutText, { color: themeColors.textSecondary }]}>{profile.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('interest')}</Text>
          <View style={styles.interestRow}>
            {localizedInterests.map((it, idx) => (
              <View key={idx} style={[styles.interestChip, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}>
                <Text style={[styles.interestText, { color: themeColors.textPrimary }]}>{it}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('myEvents')}</Text>
          {events.slice(0, 2).map((ev) => (
            <TouchableOpacity key={ev.id} style={[styles.eventRow, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1, padding: 10, borderRadius: 12 }]} onPress={() => navigation.navigate('EventDetails', { event: ev })}>
              <Image source={{ uri: ev.image }} style={styles.eventThumb} />
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <Text style={[styles.eventTitle, { color: themeColors.textPrimary }]} numberOfLines={1}>{ev.title}</Text>
                <Text style={[styles.eventSub, { color: themeColors.textSecondary }]}>{ev.date} · {ev.location}</Text>
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
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: spacing.sm, borderWidth: 3, borderColor: colors.primary },
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
  aboutText: { lineHeight: 22 },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap' },
  interestChip: { borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 6, marginRight: spacing.sm, marginBottom: spacing.sm },
  interestText: { fontWeight: '600', fontSize: fontSize.xs },
  eventRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  eventThumb: { width: 56, height: 56, borderRadius: radius.md },
  eventTitle: { fontWeight: '700' },
  eventSub: { fontSize: fontSize.xs, marginTop: 2 },
});