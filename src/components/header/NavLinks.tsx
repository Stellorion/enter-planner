import Link from 'next/link';

const NavLinks = () => {
  return (
    <>
      <Link href="/admin" className="text-black hover:underline">
        Admin
      </Link>
      <Link href="/calendar" className="text-black hover:underline">
        Calendar
      </Link>
      <Link href="/tasks" className="text-black hover:underline">
        Tasks
      </Link>
    </>
  );
};

export default NavLinks;
