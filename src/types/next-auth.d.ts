/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextAuthOptions} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      fullName?: string | null; 
    };
  }

  interface User {
    id: string;
    email: string;
    fullName?: string | null; 
  }

  interface JWT {
    id: string;
    email: string;
    fullName?: number | null; 
  }
}
