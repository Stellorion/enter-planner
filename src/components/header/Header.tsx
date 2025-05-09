import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed z-15 flex w-full items-center justify-between border-b border-gray-200 bg-white p-4 font-sans shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <MobileMenu />

      <Link
        href="./"
        className="text-xl font-bold text-gray-900 dark:text-gray-100"
      >
        Enter Planner
      </Link>

      <nav className="hidden space-x-4 md:flex">
        <NavLinks className="text-gray-900 dark:text-gray-100" />
      </nav>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {session ? <UserMenu session={session} /> : <AuthButtons />}
      </div>
    </header>
  );
};

export default Header;
