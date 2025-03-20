import React from 'react';

const HeroSection = () => {
  return (
    <div className="text-center">
      <div
        className="mx-auto mb-4 h-20 w-20 rounded-lg bg-cover bg-center bg-no-repeat filter-none dark:filter-none"
        style={{ backgroundImage: "url('/ep-icon.png')" }}
      ></div>
      <h1 className="mb-4 text-4xl font-bold">
        Think, plan, and track <br /> all in one place
      </h1>
      <p className="mb-8">Efficiently manage your tasks and boost productivity.</p>
    </div>
  );
};

export default HeroSection;
