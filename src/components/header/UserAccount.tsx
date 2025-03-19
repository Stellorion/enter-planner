'use client';

import { signOut } from "next-auth/react";

const UserAccount = () => {
  return (
    <button 
      onClick={() => signOut()}
      className="rounded-lg border px-4 py-2 text-black shadow-lg transition hover:bg-gray-200"
    >
      Sign out
    </button>
  );
};

export default UserAccount;
