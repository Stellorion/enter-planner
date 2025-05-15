'use client';

import { ReactNode } from 'react';
import Sidebar from '@/src/components/dashboard/Siderbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen mt-18 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col items-start">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and connected services.
          </p>
        </div>
        {children}
      </main>
    </div>
  );
}