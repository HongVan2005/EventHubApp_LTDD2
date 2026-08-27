// ============================================================
// Dữ liệu mẫu (mock data) - dùng để hiển thị giao diện demo
// Trong dự án thực tế, dữ liệu này sẽ được lấy từ API backend
// ============================================================

// Danh sách danh mục sự kiện hiển thị ở màn hình Home
export const categories = [
  { id: 'c1', name: 'Sports', icon: 'basketball-outline', color: '#FF6B6B' },
  { id: 'c2', name: 'Music', icon: 'musical-notes-outline', color: '#FFA458' },
  { id: 'c3', name: 'Food', icon: 'restaurant-outline', color: '#2ED47A' },
  { id: 'c4', name: 'Art', icon: 'color-palette-outline', color: '#7C6BFF' },
];

// Danh sách sự kiện mẫu
export const events = [
  {
    id: 'e1',
    title: 'Hòa nhạc Ban nhạc Quốc tế',
    date: '10 Tháng 6',
    location: 'Số 36 Đường Phố Chính, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
    going: 20,
    price: 50,
    organizer: 'Ashfak Sayem',
    description:
      'Cùng hòa mình vào đêm nhạc quốc tế với sự góp mặt của nhiều nghệ sĩ nổi tiếng. Vé đã bao gồm chỗ ngồi và một phần đồ uống nhẹ.',
  },
  {
    id: 'e2',
    title: 'Tiệc Nước hoa Jo Malone London',
    date: '10 Tháng 6',
    location: 'Phòng trưng bày Radius, TP.HCM',
    image: 'https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?w=600',
    going: 24,
    price: 30,
    organizer: 'David Sibia',
    description:
      'Sự kiện ra mắt bộ sưu tập nước hoa mới, trải nghiệm mùi hương và giao lưu cùng chuyên gia mùi hương hàng đầu.',
  },
  {
    id: 'e3',
    title: 'Hội nghị Lãnh đạo Nữ giới',
    date: '15 Tháng 6',
    location: 'Trung tâm Hội nghị Quốc gia',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    going: 45,
    price: 0,
    organizer: 'Angelina Zoly',
    description:
      'Hội nghị dành cho các nữ lãnh đạo trẻ, chia sẻ kinh nghiệm và kết nối cộng đồng nữ giới trong kinh doanh.',
  },
  {
    id: 'e4',
    title: 'Triển lãm Nghệ thuật Đương đại',
    date: '18 Tháng 6',
    location: 'Bảo tàng Mỹ thuật Thành phố',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600',
    going: 12,
    price: 15,
    organizer: 'Rocky Velloqiun',
    description:
      'Triển lãm nghệ thuật đương đại kết hợp văn hoá đại chúng, phù hợp cho người yêu thích hội hoạ và thiết kế.',
  },
  {
    id: 'e5',
    title: 'Ngày hội Âm nhạc Thiếu nhi Quốc tế',
    date: '22 Tháng 6',
    location: 'Công viên Biển Đông, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600',
    going: 8,
    price: 0,
    organizer: 'Zenifero Bolex',
    description:
      'Ngày hội âm nhạc dành cho thiếu nhi với nhiều hoạt động vui chơi, biểu diễn và trò chơi tương tác miễn phí.',
  },
];

// Danh sách thông báo mẫu
export const notifications = [
  {
    id: 'n1',
    name: 'Adam Sky',
    avatar: 'https://i.pravatar.cc/100?img=12',
    message: 'đã mời bạn tham gia sự kiện',
    time: '2 phút trước',
    type: 'invite',
  },
  {
    id: 'n2',
    name: 'Rocky Velloqiun',
    avatar: 'https://i.pravatar.cc/100?img=32',
    message: 'đã bình luận về sự kiện của bạn',
    time: '1 giờ trước',
    type: 'comment',
  },
  {
    id: 'n3',
    name: 'Jenifer Wilson',
    avatar: 'https://i.pravatar.cc/100?img=45',
    message: 'sắp diễn ra sau 2 ngày nữa',
    time: 'Hôm qua',
    type: 'reminder',
  },
];

// Danh sách bạn bè để mời tham gia sự kiện
export const friends = [
  { id: 'f1', name: 'Alex Linda', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 'f2', name: 'Rocky Velloqiun', avatar: 'https://i.pravatar.cc/100?img=15' },
  { id: 'f3', name: 'Angelina Zoly', avatar: 'https://i.pravatar.cc/100?img=25' },
  { id: 'f4', name: 'Jenifer Wilson', avatar: 'https://i.pravatar.cc/100?img=29' },
  { id: 'f5', name: 'Zenifero Bolex', avatar: 'https://i.pravatar.cc/100?img=33' },
];

// Thông tin người dùng hiện tại (demo)
export const currentUser = {
  id: 'u1',
  name: 'Nguyễn Thị Hồng Vân',
  avatar: 'https://i.pravatar.cc/200?img=13',
  followers: 120,
  following: 260,
  about:
    'Yêu thích du lịch và âm nhạc. Thường xuyên tổ chức các buổi gặp gỡ cộng đồng vào cuối tuần.',
  interests: ['Music', 'Sports', 'Art'],
};

// Thông tin ban tổ chức sự kiện (demo)
export const organizer = {
  id: 'o1',
  name: 'David Sibia',
  avatar: 'https://i.pravatar.cc/200?img=51',
  followers: 340,
  following: 190,
  about:
    'Đơn vị tổ chức sự kiện chuyên nghiệp với hơn 5 năm kinh nghiệm trong lĩnh vực âm nhạc và nghệ thuật.',
  reviews: [
    {
      id: 'r1',
      name: 'Rocky Velloqiun',
      avatar: 'https://i.pravatar.cc/100?img=15',
      rating: 5,
      comment: 'Sự kiện được tổ chức rất chuyên nghiệp, mình sẽ tham gia lần sau!',
    },
    {
      id: 'r2',
      name: 'Angelina Zoly',
      avatar: 'https://i.pravatar.cc/100?img=25',
      rating: 4,
      comment: 'Không gian đẹp, nhân viên hỗ trợ nhiệt tình.',
    },
  ],
};

export default { categories, events, notifications, friends, currentUser, organizer };