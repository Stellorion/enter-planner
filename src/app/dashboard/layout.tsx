'use client';

import { ReactNode } from 'react';
import Sidebar from '@/src/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen mt-18 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}