"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center justify-between bg-white p-4">
      <Link href="./" className="text-xl font-bold text-black">
        Enter Planner
      </Link>
      <nav className="hidden md:flex space-x-4">
        <Link href="#" className="text-black hover:underline">
          Place 1
        </Link>
        <Link href="#" className="text-black hover:underline">
          Place 2
        </Link>
        <Link href="#" className="text-black hover:underline">
          Place 3
        </Link>
        <Link href="#" className="text-black hover:underline">
          Place 4
        </Link>
      </nav>
      <div className="hidden md:flex space-x-4">
        <Link
          href="./../login"
          className="rounded-lg border px-4 py-2 text-black shadow-lg transition hover:bg-gray-200"
        >
          Log in
        </Link>
        <Link
          href="./../signup"
          className="rounded-lg border px-4 py-2 text-black shadow-lg transition hover:bg-gray-200"
        >
          Sign up
        </Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <Link href="#" className="text-black hover:underline">
              Place 1
            </Link>
            <Link href="#" className="text-black hover:underline">
              Place 2
            </Link>
            <Link href="#" className="text-black hover:underline">
              Place 3
            </Link>
            <Link href="#" className="text-black hover:underline">
              Place 4
            </Link>
            <div className="flex space-x-4">
              <Link
                href="./../Login"
                className="rounded-lg border px-4 py-2 text-black shadow-lg transition hover:bg-gray-200"
              >
                Log in
              </Link>
              <Link
                href="./../Signup"
                className="rounded-lg border px-4 py-2 text-black shadow-lg transition hover:bg-gray-200"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;