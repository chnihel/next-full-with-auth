'use client';

import { signIn } from 'next-auth/react';
import { FaGithub, FaLock } from "react-icons/fa";

const LoginActions = () => {
  return (
    <div className="d-flex gap-3 mt-4">
      <button onClick={() => signIn("auth0")} className="btn btn-outline-primary d-flex align-items-center">
        <FaLock className="me-2" />
        Sign in with Auth0
      </button>
      <button onClick={() => signIn("github")} className="btn btn-dark d-flex align-items-center">
        <FaGithub className="me-3" />
        Sign in with Github
      </button>
    </div>
  );
};

export default LoginActions;
