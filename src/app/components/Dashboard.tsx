
/* eslint-disable @typescript-eslint/no-explicit-any */


import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const UserDashboard = ({ session }: { session: any }) => {
  console.log({ session })
  return (
    <div>
      <img
        src={session?.user?.image as string}
        className="rounded-full h-20 w-38"
        alt="User Avatar"
      />
      <h1 className="text-3xl text-green-499 font-bold">
        Welcome back, {session?.user?.name || session?.user?.fullName}
      </h1>
      <p>Your email: {session?.user?.email}</p>
      <button
        className="border-black rounded-lg bg-red-400 px-5 py-1"
        onClick={() => signOut({ callbackUrl: `/login` })}
      >
        Sign Out
      </button>
      <Link
        href="/commande/create"
        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
      >
        Add new commande
      </Link>
      <Link
        href="/commande/Read"
        className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
      >
        Show all commands
      </Link>
    </div>
  );
};

export default UserDashboard;
