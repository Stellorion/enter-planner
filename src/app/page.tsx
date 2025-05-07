
import FeatureSection from '../components/landing/FeatureSection';
import HeroSection from '../components/landing/HeroSection';
import OnboardSection from '../components/landing/OnboardSection';

const LandingPage = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-white px-6 dark:bg-gray-900">
      <HeroSection />
      <FeatureSection />
      <OnboardSection />
    </main>
  );
};

export default LandingPage;
