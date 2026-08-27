// ============================================================
// Bảng màu & theme dùng chung cho toàn bộ ứng dụng EventHub
// Tất cả các màn hình nên import màu từ đây để đồng bộ giao diện
// ============================================================

export const colors = {
  primary: '#5B5FEF', // Màu tím xanh chủ đạo (nút, tiêu đề, header)
  primaryDark: '#4347C4',
  primaryLight: '#EEF0FF',
  secondary: '#33E4DB', // Màu xanh ngọc phụ (logo, điểm nhấn)

  // Màu cho các thẻ danh mục (category)
  sports: '#FF6B6B',
  music: '#FFA458',
  food: '#2ED47A',
  art: '#7C6BFF',

  background: '#F7F8FC', // Nền chung của app
  card: '#FFFFFF',
  border: '#ECEDF3',

  textPrimary: '#1E1E2D',
  textSecondary: '#8F92A1',
  textPlaceholder: '#B7B9C4',

  success: '#2ED47A',
  danger: '#FF5C5C',
  warning: '#FFB020',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(30,30,45,0.55)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 30,
};

export default { colors, spacing, radius, fontSize };
