import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";

const AuthButtons = () => {
  return (
    <>
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-md px-4 py-2 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 shadow-sm transition hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        Log in <FaArrowRight />
      </Link>
    </>
  );
};

export default AuthButtons;
