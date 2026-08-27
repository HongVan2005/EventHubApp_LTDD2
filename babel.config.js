// Cấu hình Babel cho dự án Expo
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugin reanimated luôn phải đặt cuối cùng trong danh sách
    plugins: ['react-native-reanimated/plugin'],
  };
};
