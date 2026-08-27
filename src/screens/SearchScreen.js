// ============================================================
// 13. SEARCH (White Bar) - Tìm kiếm sự kiện
// ============================================================
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import { events } from '../data/mockData';
import { colors, radius, fontSize, spacing } from '../theme/colors';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  // Lọc sự kiện theo từ khoá nhập vào (không phân biệt hoa thường)
  const results = useMemo(() => {
    if (!query.trim()) return events;
    return events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={colors.textPlaceholder}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
        <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.navigate('Filter')}>
          <Ionicons name="options-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy sự kiện phù hợp</Text>}
        renderItem={({ item }) => (
          <EventCard event={item} horizontal={false} onPress={() => navigation.navigate('EventDetails', { event: item })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, height: 44, borderRadius: radius.lg, paddingHorizontal: spacing.md, marginHorizontal: spacing.sm, borderWidth: 1, borderColor: colors.border },
  input: { flex: 1, marginLeft: spacing.sm, color: colors.textPrimary, fontSize: fontSize.sm },
  emptyText: { textAlign: 'center', color: colors.textSecondary, marginTop: spacing.xl },
});
