import Link from 'next/link';

interface NavLinksProps {
  className?: string;
}

const NavLinks = ({ className = '' }: NavLinksProps) => {
  return (
    <>
      <Link href="/admin" className={`${className} relative group`}>
        Admin
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-100 rounded-3xl transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-blue-500"></span>
      </Link>
      <Link href="/calendar" className={`${className} relative group`}>
        Calendar
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-100 rounded-3xl transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-blue-500"></span>
      </Link>
      <Link href="/tasks" className={`${className} relative group`}>
        Tasks
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-100 rounded-3xl transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-blue-500"></span>
      </Link>
    </>
  );
};

export default NavLinks;
