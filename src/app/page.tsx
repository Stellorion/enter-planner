import FeatureCard from '@/src/components/landing/FeatureCard';
import ReminderCard from '@/src/components/landing/ReminderCard';
import HeroSection from '@/src/components/landing/HeroSection';
import FooterSection from '@/src/components/landing/FooterSection';
import Image from 'next/image';
import { FaRegCalendar } from "react-icons/fa";

const LandingPage = () => {
  return (
    <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-900">
                Organize your life with ease
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-md md:max-w-lg">
                Seamlessly manage your tasks and schedule in one beautiful, intuitive platform. Stay productive and
                never miss a deadline again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-blue-600 hover:bg-blue-700">
                  Get started for free
                </button>
                <button className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Take a tour
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto md:max-w-none">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="TaskFlow app dashboard"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Everything you need to stay organized
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to boost your productivity and simplify your day-to-day planning.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Calendar className="h-8 w-8 text-blue-600" />,
                  title: "Smart Calendar",
                  description:
                    "Visualize your schedule with our intuitive calendar interface. Drag and drop events to reschedule.",
                },
                {
                  icon: <CheckSquare className="h-8 w-8 text-blue-600" />,
                  title: "Task Management",
                  description:
                    "Create, organize, and prioritize tasks with ease. Set deadlines and never miss important to-dos.",
                },
                {
                  icon: <Clock className="h-8 w-8 text-blue-600" />,
                  title: "Reminders",
                  description: "Get timely notifications for upcoming events and tasks across all your devices.",
                },
                {
                  icon: <Users className="h-8 w-8 text-blue-600" />,
                  title: "Collaboration",
                  description:
                    "Share calendars and task lists with family, friends, or colleagues for seamless teamwork.",
                },
                {
                  icon: <Smartphone className="h-8 w-8 text-blue-600" />,
                  title: "Mobile Access",
                  description: "Access your schedule and tasks from anywhere with our mobile-friendly design.",
                },
                {
                  icon: <Cloud className="h-8 w-8 text-blue-600" />,
                  title: "Cloud Sync",
                  description: "Your data is automatically synced across all your devices in real-time.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-blue-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How TaskFlow works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Getting started is simple. Follow these steps to transform your productivity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create an account",
                  description: "Sign up for free in seconds and set up your profile.",
                },
                {
                  step: "02",
                  title: "Add your tasks & events",
                  description: "Input your schedule and to-dos or import from other apps.",
                },
                {
                  step: "03",
                  title: "Stay organized",
                  description: "Get reminders, track progress, and accomplish more every day.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get started now
              </Button>
            </div>
          </div>
        </section>
      </main>
  );
};

export default LandingPage;
