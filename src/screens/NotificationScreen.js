// src/screens/NotificationScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { notifications as mockNotifications } from '../data/mockData';
import { radius, fontSize, spacing } from '../theme/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function NotificationScreen({ navigation }) {
  const { themeColors, t } = useContext(ThemeContext);
  const [showEmpty, setShowEmpty] = useState(false);
  const data = showEmpty ? [] : mockNotifications;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.roundBtn, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}
        >
          <Ionicons name="chevron-back" size={22} color={themeColors.textPrimary} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>
          {t('notification')}
        </Text>

        <TouchableOpacity 
          style={[styles.roundBtn, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]} 
          onPress={() => setShowEmpty(!showEmpty)}
        >
          <Ionicons name={showEmpty ? 'refresh' : 'checkmark-done-outline'} size={20} color={themeColors.textPrimary} />
        </TouchableOpacity>
      </View>

      {data.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="notifications-off-outline" size={72} color={themeColors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: themeColors.textPrimary }]}>
            {t('noNotification')}
          </Text>
          <Text style={[styles.emptySub, { color: themeColors.textSecondary }]}>
            {t('notificationEmptySub')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
          renderItem={({ item }) => (
            <View style={[styles.notiRow, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <Text style={[styles.notiText, { color: themeColors.textPrimary }]}>
                  <Text style={[styles.notiName, { color: themeColors.textPrimary }]}>{item.name}</Text> {item.message}
                </Text>
                <Text style={[styles.notiTime, { color: themeColors.textSecondary }]}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  roundBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '800' },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: '800', marginTop: spacing.md },
  emptySub: { textAlign: 'center', marginTop: spacing.xs, lineHeight: 20 },
  notiRow: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.md, padding: spacing.sm, marginBottom: spacing.sm },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  notiText: { lineHeight: 19 },
  notiName: { fontWeight: '700' },
  notiTime: { fontSize: fontSize.xs, marginTop: 2 },
});