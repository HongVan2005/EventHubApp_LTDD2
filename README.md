# EventHub App (React Native + Expo)

Ứng dụng đặt vé/khám phá sự kiện **EventHub**, được xây dựng lại hoàn chỉnh bằng
**React Native (Expo)** dựa trên bộ thiết kế UI (24 màn hình) được cung cấp.
Toàn bộ mã nguồn có chú thích cơ bản bằng **tiếng Việt** để dễ đọc và bảo trì.

## 1. Yêu cầu môi trường

- Node.js >= 18 (khuyến nghị bản LTS)
- npm (đi kèm Node.js)
- Điện thoại cài ứng dụng **Expo Go** (tải trên App Store / Google Play) để quét mã QR chạy thử,
  hoặc máy ảo Android Studio / Xcode Simulator nếu muốn chạy trên máy tính.

## 2. Cài đặt

```bash
# Giải nén / clone dự án, sau đó vào thư mục dự án
cd EventHubApp

# Cài đặt toàn bộ thư viện
npm install
```

## 3. Chạy dự án

```bash
npx expo start
```

Sau khi lệnh trên chạy xong, terminal sẽ hiện mã QR:

- **Trên điện thoại**: mở app **Expo Go**, chọn "Scan QR code" và quét mã QR hiển thị trên terminal.
- **Trên máy ảo Android**: nhấn phím `a` trong terminal (cần Android Studio đã cài sẵn máy ảo).
- **Trên máy ảo iOS** (chỉ macOS): nhấn phím `i` trong terminal (cần Xcode).
- **Trên trình duyệt web** (xem thử nhanh giao diện): nhấn phím `w`.

## 4. Cấu trúc thư mục

```
EventHubApp/
├─ App.js                     # Điểm khởi chạy chính của ứng dụng
├─ app.json                   # Cấu hình Expo (tên app, icon, splash...)
├─ babel.config.js            # Cấu hình Babel
├─ src/
│  ├─ theme/colors.js         # Bảng màu, khoảng cách, kích thước dùng chung
│  ├─ data/mockData.js        # Dữ liệu mẫu: sự kiện, người dùng, thông báo...
│  ├─ components/             # Các component dùng chung (nút, ô nhập, thẻ sự kiện...)
│  ├─ navigation/              # Cấu hình điều hướng (Stack, Drawer, Bottom Tabs)
│  └─ screens/                 # Toàn bộ 24 màn hình của ứng dụng
```

## 5. Danh sách màn hình (theo đúng thứ tự thiết kế gốc)

| # | Màn hình | File |
|---|----------|------|
| 1 | Splash Screen | `src/screens/SplashScreen.js` |
| 2-4 | Onboarding 1, 2, 3 | `src/screens/Onboarding1Screen.js`, `Onboarding2Screen.js`, `Onboarding3Screen.js` |
| 5 | Sign in | `src/screens/SignInScreen.js` |
| 6 | Sign up | `src/screens/SignUpScreen.js` |
| 7 | Verification | `src/screens/VerificationScreen.js` |
| 8 | Reset Password | `src/screens/ResetPasswordScreen.js` |
| 9 | Menu (Drawer) | `src/screens/MenuScreen.js` |
| 10 | Home | `src/screens/HomeScreen.js` |
| 11 | Event Details | `src/screens/EventDetailsScreen.js` |
| 12 | Map View | `src/screens/MapViewScreen.js` |
| 13 | Search | `src/screens/SearchScreen.js` |
| 14 | Filter | `src/screens/FilterScreen.js` |
| 15-16 | See All Events / Empty Events | `src/screens/EventsScreen.js` (chuyển tab để xem cả 2 trạng thái) |
| 17 | My Profile | `src/screens/MyProfileScreen.js` |
| 18-20 | Organizer Profile (About/Event/Review) | `src/screens/OrganizerProfileScreen.js` |
| 21-22 | Notification / Empty Notification | `src/screens/NotificationScreen.js` (nút góc phải để chuyển trạng thái) |
| 23 | Invite Friend | `src/screens/InviteFriendScreen.js` |
| 24 | Share | `src/screens/ShareScreen.js` |

## 6. Ghi chú kỹ thuật

- Điều hướng dùng **React Navigation** (Native Stack + Drawer + Bottom Tabs).
- Dữ liệu trong app hiện là **dữ liệu mẫu tĩnh** (`src/data/mockData.js`) — chưa kết nối API thật.
  Khi có backend, chỉ cần thay các hàm lấy dữ liệu mẫu bằng gọi API tương ứng.
- Màn hình **Map View** dùng ảnh bản đồ tĩnh kèm ghim vị trí minh hoạ để tránh phải cấu hình
  thư viện bản đồ gốc (native) phức tạp (Google Maps API Key...). Khi triển khai thật, có thể thay
  bằng `react-native-maps`.
- Đã kiểm tra: `npm install` thành công, biên dịch Babel toàn bộ file không lỗi, và
  `npx expo export` bundle thành công (Metro bundler không báo lỗi).

## 7. Lịch sử commit

Dự án được phát triển và commit theo từng nhóm tính năng, toàn bộ nội dung commit bằng tiếng Việt.
Xem lịch sử đầy đủ bằng lệnh:

```bash
git log --oneline
```
