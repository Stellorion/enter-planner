'use client';

import { useMobileMenuStore } from '@/src/store/useMenuStore';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLinks from './NavLinks';

const MobileMenu = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenuStore();

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="text-black focus:outline-none">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <nav className="items-left flex flex-col space-y-4 p-4 pt-0 text-lg font-medium">
            <NavLinks />
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
