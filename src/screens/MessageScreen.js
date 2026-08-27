// src/screens/MessageScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const messages = [
  { id: '1', name: 'Adam Sky', lastMessage: 'Hẹn gặp bạn ở sự kiện tối nay nhé!', time: '10:20 AM', avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: '2', name: 'Rocky Velloqiun', lastMessage: 'Vé sự kiện đã được gửi qua email.', time: '08:45 AM', avatar: 'https://i.pravatar.cc/100?img=5' },
];

export default function MessageScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.roundBtn, { backgroundColor: themeColors.surface }]}>
          <Ionicons name="chevron-back" size={22} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>{t('messages')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.name, { color: themeColors.textPrimary }]}>{item.name}</Text>
              <Text style={[styles.msg, { color: themeColors.textSecondary }]} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            <Text style={[styles.time, { color: themeColors.textSecondary }]}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  roundBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  name: { fontSize: 15, fontWeight: '700' },
  msg: { fontSize: 13, marginTop: 4 },
  time: { fontSize: 11, marginLeft: 8 },
});