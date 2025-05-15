'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { FiSettings, FiLogOut } from 'react-icons/fi';

interface UserMenuProps {
  session: Session | null;
}

const UserMenu = ({ session }: UserMenuProps) => {
  if (!session?.user) return null;

  const getInitials = () => {
    if (session.user.email) {
      return session.user.email
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase();
    }
    return session.user.email?.[0].toUpperCase() || '?';
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 rounded-full hover:opacity-80 transition-all duration-300 ease-in-out">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-medium text-gray-100">
          {getInitials()}
        </div>
      </Menu.Button>

      <Transition
        as="div"
        enter="transition-opacity duration-300 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="ring-opacity-5 absolute right-0 mt-2 w-72 origin-top-right rounded-sm bg-white text-gray-800 shadow-lg ring-1 ring-gray-200 focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-800">
          <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Welcome, {session.user.firstName || 'User'} {session.user.lastName}!
            </p>
            <p className="truncate text-sm text-gray-600 dark:text-gray-400">
              {session.user.email}
            </p>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard"
                  className={`flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 ${
                    active ? 'bg-gray-200 dark:bg-gray-800' : ''
                  }`}
                >
                  <FiSettings className="h-4 w-4" />
                  <span>Manage Account</span>
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="border-t border-gray-200 py-1 dark:border-gray-800">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 ${
                    active ? 'bg-gray-200 dark:bg-gray-800' : ''
                  }`}
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;