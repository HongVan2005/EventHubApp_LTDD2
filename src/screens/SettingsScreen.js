// src/screens/SettingsScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import ScreenHeader from '../components/ScreenHeader';

const languages = [
  { code: 'vi', label: 'Tiếng Việt 🇻🇳' },
  { code: 'en', label: 'English 🇺🇸' },
  { code: 'ja', label: '日本語 🇯🇵' },
  { code: 'ko', label: '한국어 🇰🇷' },
];

export default function SettingsScreen({ navigation }) {
  const { isDarkMode, toggleTheme, language, changeLanguage, themeColors, t } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScreenHeader title={t('settings') || 'Settings'} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ĐỔI GIAO DIỆN SÁNG / TỐI */}
        <Text style={[styles.groupLabel, { color: themeColors.textSecondary }]}>{t('theme') || 'Theme'}</Text>
        <View style={[styles.section, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('darkMode') || 'Dark Mode'}</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#E4E6EB', true: '#5669FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* CHỌN NGÔN NGỮ */}
        <Text style={[styles.groupLabel, { color: themeColors.textSecondary }]}>{t('language') || 'Language'}</Text>
        <View style={[styles.section, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          {languages.map((lang, index) => {
            const isSelected = language === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langItem,
                  index < languages.length - 1 && { borderBottomWidth: 1, borderBottomColor: themeColors.border },
                ]}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text style={[styles.langText, { color: themeColors.textPrimary }]}>{lang.label}</Text>
                {isSelected && <Ionicons name="checkmark-circle" size={22} color={themeColors.primary} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  groupLabel: { fontSize: 13, fontWeight: '700', marginTop: 16, marginBottom: 8, textTransform: 'uppercase' },
  section: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginLeft: 12 },
  langItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  langText: { fontSize: 15, fontWeight: '500' },
});