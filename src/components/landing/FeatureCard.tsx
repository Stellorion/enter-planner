import React from 'react';

const FeatureCard = () => {
  return (
    <div className="relative hidden w-64 rounded-lg bg-yellow-100 p-6 text-gray-600 md:block">
      <p>
        "Take notes to keep track of crucial details, and accomplish more tasks
        with ease."
      </p>
      <div className="absolute right-2 bottom-2 text-2xl text-blue-500">✓</div>
    </div>
  );
};

export default FeatureCard;
