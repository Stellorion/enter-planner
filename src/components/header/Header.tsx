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
    <header className="fixed z-10 flex w-full items-center justify-between bg-gray-100 p-4 font-sans shadow-md">
      <MobileMenu />

      <Link href="./" className="text-xl font-bold text-black">
        Enter Planner
      </Link>

      <nav className="hidden space-x-4 md:flex">
        <NavLinks />
      </nav>

      <div className="space-x-4 md:flex">
        {session ? <UserMenu session={session} /> : <AuthButtons />}
      </div>
    </header>
  );
};

export default Header;
