// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('vi');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }

      const savedLang = await AsyncStorage.getItem('app_language');
      if (savedLang !== null) {
        setLanguage(savedLang);
        i18n.changeLanguage(savedLang);
      }
    } catch (e) {
      console.log('Lỗi cài đặt:', e);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('app_theme', newTheme ? 'dark' : 'light');
  };

  const changeLanguage = async (langCode) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
    await AsyncStorage.setItem('app_language', langCode);
  };

  // Hệ màu chuẩn áp dụng cho toàn bộ các màn hình trong app
  const themeColors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    surface: isDarkMode ? '#1E1E1E' : '#F8F9FA',
    textPrimary: isDarkMode ? '#FFFFFF' : '#120D26',
    textSecondary: isDarkMode ? '#AAAAAA' : '#747688',
    border: isDarkMode ? '#2C2C2C' : '#E4E6EB',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    primary: '#5669FF',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, language, changeLanguage, themeColors, t }}>
      {children}
    </ThemeContext.Provider>
  );
};