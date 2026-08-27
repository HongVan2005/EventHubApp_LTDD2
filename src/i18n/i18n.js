// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      settings: 'Cài đặt',
      theme: 'Giao diện sáng / tối',
      darkMode: 'Chế độ tối',
      language: 'Ngôn ngữ',
      accountManager: 'Quản lý tài khoản',
      signOut: 'Đăng xuất',
      switchAccount: 'Chuyển đổi tài khoản',
      profile: 'Trang cá nhân',
      messages: 'Tin nhắn',
      events: 'Sự kiện',
    },
  },
  en: {
    translation: {
      settings: 'Settings',
      theme: 'Light / Dark Theme',
      darkMode: 'Dark Mode',
      language: 'Language',
      accountManager: 'Account Manager',
      signOut: 'Sign Out',
      switchAccount: 'Switch Account',
      profile: 'My Profile',
      messages: 'Message',
      events: 'Events',
    },
  },
  ja: {
    translation: {
      settings: '設定',
      theme: 'ライト / ダークテーマ',
      darkMode: 'ダークモード',
      language: '言語',
      accountManager: 'アカウント管理',
      signOut: 'ログアウト',
      switchAccount: 'アカウント切り替え',
      profile: 'プロフィール',
      messages: 'メッセージ',
      events: 'イベント',
    },
  },
  ko: {
    translation: {
      settings: '설정',
      theme: '밝은 / 어두운 테마',
      darkMode: '다크 모드',
      language: '언어',
      accountManager: '계정 관리',
      signOut: '로그아웃',
      switchAccount: '계정 전환',
      profile: '내 프로필',
      messages: '메시지',
      events: '이벤트',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi', // Ngôn ngữ mặc định
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;