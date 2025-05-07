'use client';

import { useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useThemeStore } from '@/src/store/useThemeStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-2 text-gray-900 border border-gray-200 hover:bg-gray-200 dark:text-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 transition"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FaSun className="h-6 w-6" />
      ) : (
        <FaMoon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeToggle;