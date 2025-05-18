import { ProfileForm } from "@/src/components/dashboard/ProfileForm";

const Title = 'Profile';
const Description = 'Manage your profile information.';

export default function DashboardProfile() {
  return (
    <div>
      <div className="mb-4 flex flex-col items-start">
        <h1 className="text-4xl font-bold">{Title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{Description}</p>
      </div>
      
      <ProfileForm />
    </div>
  );
}