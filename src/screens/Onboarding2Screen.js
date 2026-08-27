// ============================================================
// 3. ONBOARDING 2 - Giới thiệu tính năng bản đồ sự kiện
// ============================================================
import React from 'react';
import OnboardingContent from '../components/OnboardingContent';

export default function Onboarding2Screen({ navigation }) {
  return (
    <OnboardingContent
      step={1}
      image="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
      title="Web Have Modern Events Calendar Feature"
      description="Theo dõi lịch sự kiện hiện đại, sắp xếp khoa học theo ngày tháng để không bỏ lỡ sự kiện nào."
      onSkip={() => navigation.replace('SignIn')}
      onNext={() => navigation.navigate('Onboarding3')}
    />
  );
}
