// Cấu hình Babel cho dự án Expo
// Lưu ý: từ Expo SDK 50 trở lên, babel-preset-expo tự động nhận diện
// và thêm plugin Worklets (react-native-worklets/plugin) cho Reanimated 4
// khi phát hiện gói react-native-worklets đã được cài đặt, nên KHÔNG cần
// khai báo thủ công plugin reanimated/worklets ở đây nữa.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
