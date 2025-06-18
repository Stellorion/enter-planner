'use client';

import Link from 'next/link';
import {
  FaUser,
  FaRegSun,
  FaRegQuestionCircle,
  FaLink,
  FaThLarge,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

export default function Sidebar() {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const isSidebarExpanded = isLargeScreen || sidebarOpen;

  return (
    <aside
      className={`flex flex-col space-y-2 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-all duration-300
        ${isSidebarExpanded ? 'w-48' : 'w-16'}
        lg:w-64
      `}
    >
      {!isLargeScreen && (
        <button
          className="p-2 transition-all text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-white"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      )}

      <nav className="space-y-2">
        <SidebarItem
          href="/dashboard"
          label="Dashboard"
          icon={<FaThLarge className="h-5 w-5" />}
          isOpen={isSidebarExpanded}
        />
        <SidebarItem
          href="/dashboard/profile"
          label="Profile"
          icon={<FaUser className="h-5 w-5" />}
          isOpen={isSidebarExpanded}
        />
        <SidebarItem
          href="/dashboard/connections"
          label="Connections"
          icon={<FaLink className="h-5 w-5" />}
          isOpen={isSidebarExpanded}
        />
        <SidebarItem
          href="/dashboard/settings"
          label="Settings"
          icon={<FaRegSun className="h-5 w-5" />}
          isOpen={isSidebarExpanded}
        />
        <SidebarItem
          href="/dashboard/help"
          label="Help"
          icon={<FaRegQuestionCircle className="h-5 w-5" />}
          isOpen={isSidebarExpanded}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({
  href,
  label,
  icon,
  isOpen,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg p-2 text-sm transition hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      <span className="text-lg">{icon}</span>
      <span className={`transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
        {label}
      </span>
    </Link>
  );
}