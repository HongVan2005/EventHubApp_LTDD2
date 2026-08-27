// ============================================================
// 2. ONBOARDING 1 - Giới thiệu tính năng khám phá sự kiện gần đây
// ============================================================
import React from 'react';
import OnboardingContent from '../components/OnboardingContent';

export default function Onboarding1Screen({ navigation }) {
  return (
    <OnboardingContent
      step={0}
      image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
      title="Explore Upcoming and Nearby Events"
      description="Cùng khám phá các sự kiện thú vị sắp diễn ra ở gần bạn với giao diện trực quan, dễ sử dụng."
      onSkip={() => navigation.replace('SignIn')}
      onNext={() => navigation.navigate('Onboarding2')}
    />
  );
}
