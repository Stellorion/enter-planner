import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex w-full items-center fixed font-sans justify-between bg-gray-100 shadow-md p-4 z-10">
      <MobileMenu />

      <Link href="./" className="text-xl font-bold text-black">
        Enter Planner
      </Link>
      
      <nav className="hidden md:flex space-x-4">
        <NavLinks />
      </nav>

      <div className="md:flex space-x-4">
        {session ? (
          <UserMenu session={session} />
        ) : (
          <AuthButtons />
        )}
      </div>
    </header>
  );
};

export default Header;