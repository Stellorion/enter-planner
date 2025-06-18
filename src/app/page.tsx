import FeatureSection from '../containers/Landing/FeatureSection';
import HeroSection from '../containers/Landing/HeroSection';
import OnboardSection from '../containers/Landing/OnboardSection';

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