// ============================================================
// 23. INVITE FRIEND - Mời bạn bè tham gia sự kiện
// ============================================================
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { friends } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function InviteFriendScreen({ navigation }) {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState('');

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const filteredFriends = friends.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite Friend</Text>
        <View style={styles.roundBtn} />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Search friend..."
          placeholderTextColor={colors.textPlaceholder}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <TouchableOpacity style={styles.friendRow} onPress={() => toggleSelect(item.id)}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.friendName}>{item.name}</Text>
              <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                {isSelected && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.footer}>
        <AppButton
          title={`INVITE (${selected.length})`}
          onPress={() => navigation.navigate('Share')}
          disabled={selected.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.textPrimary },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, marginHorizontal: spacing.md, borderRadius: radius.lg, height: 46, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  input: { flex: 1, marginLeft: spacing.sm, color: colors.textPrimary },
  friendRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  friendName: { flex: 1, marginLeft: spacing.sm, fontSize: fontSize.md, color: colors.textPrimary, fontWeight: '600' },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  footer: { padding: spacing.md },
});
