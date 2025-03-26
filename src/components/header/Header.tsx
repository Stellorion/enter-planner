import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex w-full items-center fixed font-sans justify-between bg-gray-100 shadow-md p-4 z-10">
      <Link href="./" className="text-xl font-bold text-black">
        Enter Planner
      </Link>
      
      <nav className="hidden md:flex space-x-4">
        <NavLinks />
      </nav>

      <div className="hidden md:flex space-x-4">
        <AuthButtons session={session} />
      </div>
      
      <MobileMenu session={session} />
    </header>
  );
};

export default Header;