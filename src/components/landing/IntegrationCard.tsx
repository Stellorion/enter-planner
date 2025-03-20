import React from 'react';
import { FaCalendar, FaTrello, FaGoogle, FaGithub } from 'react-icons/fa';

const IntegrationCard = () => {
  return (
    <div className="hidden w-1/3 rounded-lg bg-white p-6 text-gray-700 md:block">
      <h2 className="mb-4 text-xl font-semibold">100+ Integrations</h2>
      <div className="flex gap-4">
        <FaCalendar size={30} />
        <FaTrello size={30} />
        <FaGoogle size={30} />
        <FaGithub size={30} />
      </div>
    </div>
  );
};

export default IntegrationCard;
