import React from 'react';
import Header from '@/src/components/header/Header';
import FeatureCard from '@/src/components/landing/FeatureCard';
import ReminderCard from '@/src/components/landing/ReminderCard';
import HeroSection from '@/src/components/landing/HeroSection';
import FooterSection from '@/src/components/landing/FooterSection';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="flex flex-1 items-center font-sans justify-around pt-15 pl-10 pr-10">
        <FeatureCard />
        <HeroSection />
        <ReminderCard />
      </section>
      <FooterSection />
    </div>
  );
};

export default LandingPage;
