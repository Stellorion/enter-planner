'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';

const MobileMenu = ({ session }: { session: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <NavLinks />
            <AuthButtons session={session} />
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;