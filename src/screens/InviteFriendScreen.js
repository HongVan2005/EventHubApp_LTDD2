// src/screens/InviteFriendScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { friends } from '../data/mockData';

export default function InviteFriendScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const [selectedFriends, setSelectedFriends] = useState({});

  const toggleSelect = (id) => {
    setSelectedFriends((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const count = Object.values(selectedFriends).filter(Boolean).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.roundBtn, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}>
          <Ionicons name="chevron-back" size={22} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>{t('inviteFriend')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={[styles.searchBox, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
          <TextInput
            placeholder={t('searchFriend')}
            placeholderTextColor={themeColors.textSecondary}
            style={[styles.searchInput, { color: themeColors.textPrimary }]}
          />
        </View>
      </View>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => {
          const isSelected = selectedFriends[item.id];
          return (
            <TouchableOpacity
              style={[styles.friendCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => toggleSelect(item.id)}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={[styles.friendName, { color: themeColors.textPrimary, flex: 1, marginLeft: 12 }]}>{item.name}</Text>
              <View style={[styles.checkbox, isSelected && styles.checkedBox]}>
                {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={[styles.footer, { backgroundColor: themeColors.background, borderTopColor: themeColors.border }]}>
        <TouchableOpacity style={styles.inviteBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.inviteText}>{t('inviteAction')} ({count})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  roundBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 44, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  friendCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  friendName: { fontSize: 15, fontWeight: '700' },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#5669FF', alignItems: 'center', justifyContent: 'center' },
  checkedBox: { backgroundColor: '#5669FF' },
  footer: { padding: 16, borderTopWidth: 1 },
  inviteBtn: { backgroundColor: '#5669FF', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  inviteText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});