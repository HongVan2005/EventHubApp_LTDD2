// src/screens/SearchScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { events } from '../data/mockData';

export default function SearchScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const [query, setQuery] = useState('');

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()) || e.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <View style={[styles.searchBox, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
          <TextInput
            placeholder={t('searchEvent')}
            placeholderTextColor={themeColors.textSecondary}
            value={query}
            onChangeText={setQuery}
            style={[styles.input, { color: themeColors.textPrimary }]}
            autoFocus
          />
        </View>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
            onPress={() => navigation.navigate('EventDetails', { event: item })}
          >
            <Image source={{ uri: item.image }} style={styles.cardImg} />
            <View style={styles.cardBody}>
              <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>{item.title}</Text>
              <Text style={[styles.cardSub, { color: themeColors.textSecondary }]}>📍 {item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={{ color: themeColors.textSecondary }}>{t('noResults')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backBtn: { marginRight: 12 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 44, borderRadius: 12, borderWidth: 1 },
  input: { flex: 1, marginLeft: 8, fontSize: 14 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1 },
  cardImg: { width: 60, height: 60, borderRadius: 8 },
  cardBody: { marginLeft: 12, flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700' },
  cardSub: { fontSize: 12, marginTop: 4 },
  emptyBox: { alignItems: 'center', marginTop: 40 },
});