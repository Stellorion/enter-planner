import Link from 'next/link';
import UserAccount from './UserAccount';

const AuthButtons = ({ session }: { session: any }) => {
  return session?.user ? (
    <UserAccount />
  ) : (
    <>
      <Link
        href="./../login"
        className="rounded-lg border px-4 py-2 text-black shadow-lg transition hover:bg-gray-200"
      >
        Log in
      </Link>
      <Link
        href="./../signup"
        className="rounded-lg border px-4 py-2 text-black shadow-lg transition hover:bg-gray-200"
      >
        Sign up
      </Link>
    </>
  );
};

export default AuthButtons;