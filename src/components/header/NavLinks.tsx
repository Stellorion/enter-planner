import Link from 'next/link';

interface NavLinksProps {
  className?: string;
}

const NavLinks = ({ className = '' }: NavLinksProps) => {
  return (
    <>
      <Link href="/admin" className={className}>
        Admin
      </Link>
      <Link href="/calendar" className={className}>
        Calendar
      </Link>
      <Link href="/tasks" className={className}>
        Tasks
      </Link>
    </>
  );
};

export default NavLinks;