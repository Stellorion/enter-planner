'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { Menu } from '@headlessui/react';
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
      <Menu.Button className="flex items-center space-x-2 rounded-full hover:opacity-80">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-medium text-white">
          {getInitials()}
        </div>
      </Menu.Button>

      <Menu.Items className="ring-opacity-5 absolute right-0 mt-2 w-72 origin-top-right rounded-sm bg-white text-gray-700 shadow-lg ring-1 ring-gray-300 focus:outline-none">
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="text-sm font-medium text-gray-900">
            Welcome, {session.user.firstName || 'User'} {session.user.lastName}!
          </p>
          <p className="truncate text-sm text-gray-500">{session.user.email}</p>
        </div>

        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/"
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-700`}
              >
                <FiSettings className="h-4 w-4" />
                <span>Manage Account</span>
              </Link>
            )}
          </Menu.Item>
        </div>

        <div className="border-t border-gray-100 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => signOut()}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-700`}
              >
                <FiLogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;
