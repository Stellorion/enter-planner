import Link from "next/link";

const SignupHeader = () => {
  return (
    <>
      <h2 className="mb-4 w-full text-center font-semibold text-gray-800 max-lg:text-3xl lg:text-5xl">
        Sign Up
      </h2>
      <p className="mb-4 text-gray-700">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
};

export default SignupHeader;