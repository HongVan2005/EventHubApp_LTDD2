// ============================================================
// 4. ONBOARDING 3 - Giới thiệu tính năng tìm sự kiện bằng bản đồ
// ============================================================
import React from 'react';
import OnboardingContent from '../components/OnboardingContent';

export default function Onboarding3Screen({ navigation }) {
  return (
    <OnboardingContent
      step={2}
      isLast
      image="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800"
      title="To Look Up More Events or Activities Nearby By Map"
      description="Sử dụng bản đồ để tìm kiếm các hoạt động, sự kiện đang diễn ra gần vị trí của bạn một cách nhanh chóng."
      onSkip={() => navigation.replace('SignIn')}
      onNext={() => navigation.replace('SignIn')}
    />
  );
}
