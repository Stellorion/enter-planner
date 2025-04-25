import Link from 'next/link';

const AuthButtons = () => {
  return (
    <>
      <Link
        href="/login"
        className="rounded-sm px-4 py-2 text-black shadow-sm transition hover:text-gray-500"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="rounded-sm px-4 py-2 text-white bg-black shadow-sm transition hover:bg-gray-700"
      >
        Sign up
      </Link>
    </>
  );
};

export default AuthButtons;