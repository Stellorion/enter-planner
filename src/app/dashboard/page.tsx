// src/app/dashboard/page.tsx
import Dashboard from './dashboard';

const Title = 'Dashboard';
const Description = 'Manage your account and connected services.';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-4 flex flex-col items-start">
        <h1 className="text-4xl font-bold">{Title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{Description}</p>
      </div>
      <Dashboard />
    </div>
  );
}
