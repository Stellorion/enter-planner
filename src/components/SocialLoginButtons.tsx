import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaGithub } from 'react-icons/fa';

const SocialLoginButtons = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2 sm:flex-nowrap">
      <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm transition hover:bg-gray-600">
        <FcGoogle className="mr-2" size={20} /> Google
      </button>
      <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm transition hover:bg-gray-600">
        <FaApple className="mr-2" size={20} /> Apple
      </button>
      <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm transition hover:bg-gray-600">
        <FaGithub className="mr-2" size={20} /> GitHub
      </button>
    </div>
  );
};

export default SocialLoginButtons;
