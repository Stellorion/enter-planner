import React from 'react';
import { FaApple, FaGithub, FaGoogle } from 'react-icons/fa';

const SocialLoginButtons = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2 sm:flex-nowrap">
      <button className="flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-gray-200 px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-300">
        <FaGoogle className="mr-2" size={20} /> Google
      </button>
      <button className="flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-gray-200 px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-300">
        <FaApple className="mr-2" size={20} /> Apple
      </button>
      <button className="flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-gray-200 px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-300">
        <FaGithub className="mr-2" size={20} /> GitHub
      </button>
    </div>
  );
};

export default SocialLoginButtons;
