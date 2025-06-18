const HeroSection = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-gradient-to-b py-20 md:py-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-blue-400 opacity-30 blur-3xl dark:bg-blue-600" />
      </div>
      <div className="z-10 container flex flex-col items-center gap-8 md:flex-row md:gap-16">
        <div className="flex flex-1 flex-col items-center space-y-6 text-center">
          <h1 className="text-5xl font-bold text-blue-900 md:text-5xl lg:text-6xl dark:text-blue-600">
            Organize your life with ease
          </h1>
          <div className="mx-auto mb-6 h-px w-40 bg-gradient-to-r from-transparent via-blue-900 to-transparent dark:via-blue-500" />
          <p className="max-w-md text-center text-lg text-gray-600 md:max-w-lg md:text-xl dark:text-gray-500">
            Seamlessly manage your tasks and schedule in one beautiful,
            intuitive platform. Stay productive and never miss a deadline again.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
