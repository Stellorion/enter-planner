'use client';

import { useMobileMenuStore } from '@/src/store/useMenuStore';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLinks from './NavLinks';

const MobileMenu = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenuStore();

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="text-gray-900 focus:outline-none dark:text-gray-100">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full text-gray-900 border-t border-gray-200 bg-white shadow-lg md:hidden dark:text-gray-100 dark:bg-gray-900 dark:border-gray-800">
          <nav className="items-left flex flex-col space-y-4 p-4 text-lg font-medium">
            <NavLinks />
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
