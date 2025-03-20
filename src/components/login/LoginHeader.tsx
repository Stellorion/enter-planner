import Link from 'next/link';

const LoginHeader = () => {
  return (
    <>
      <h2 className="mb-4 font-semibold max-lg:text-3xl lg:text-5xl text-gray-800">
        Log in
      </h2>
      <p className="mb-4 text-gray-700">
        Don't have an account?{' '}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginHeader;