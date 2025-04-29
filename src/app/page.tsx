import FeatureCard from '@/src/components/landing/FeatureCard';
import ReminderCard from '@/src/components/landing/ReminderCard';
import HeroSection from '@/src/components/landing/HeroSection';
import FooterSection from '@/src/components/landing/FooterSection';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="flex flex-1 items-center justify-around pt-15 pr-10 pl-10 font-sans">
        <FeatureCard />
        <HeroSection />
        <ReminderCard />
      </section>
      <FooterSection />
    </div>
  );
};

export default LandingPage;
