"use client"
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import { FaGithub, FaLock } from "react-icons/fa";



export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <img src={session.user?.image as string} className=" rounded-full h-20 w-38"></img>
          <h1 className='text-3xl text-green-500 font-bold'>Welcome back, {session.user?.name} </h1>
          <p> Your email : {session.user?.email}</p>
          <button className='border-black rounded-lg bg-red-400 px-5 py-1' onClick={() => signOut({ callbackUrl: `/` })}>Sign Out</button>

          <Link
            href={"/commande/create"}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            Add new commande          </Link>
          <Link
            href={"/commande/Read"}
            className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
          >
            show all commands          </Link>

        </>
      ) : (
          <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <h1 className="text-danger fw-bold mb-4">
              <FaLock className="me-2" />
              You are not logged in
            </h1>
            <div className="d-flex gap-3">
              <button
                onClick={() => signIn("auth0")}
                className="btn btn-outline-primary d-flex align-items-center"
              >
                <FaLock className="me-2" />
                Sign in with Auth0
              </button>
              <button
                onClick={() => signIn("github")}
                className="btn btn-dark d-flex align-items-center"
              >
                <FaGithub className="me-2" />
                Sign in with Github
              </button>
            </div>
          </div>
      )}

    </>
  )
}
