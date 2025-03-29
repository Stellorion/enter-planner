import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.userRole === 'ADMIN') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl">
          Welcome to Admin {session?.user.firstName} {session?.user.lastName}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl">You do not have premission to view this page {session?.user.userRole}</h1>
    </div>
  );
};

export default AdminPage;
