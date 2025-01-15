import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import AuthProvider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions : NextAuthOptions ={
  session :{
    strategy : "jwt"
  },
  
    providers :[
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string ,
      }),
      AuthProvider({
        clientId: process.env.AUTH0_ID as string,
        clientSecret: process.env.AUTH0_SECRET as string , 
         issuer: `https://${process.env.AUTH0_DOMAIN}`,
          authorization: { params: { scope: "openid email profile" } }, 
        }),
        CredentialsProvider ({
          name :"credentials",
          credentials:{
           email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
                },
                async authorize(Credentials) {

                   const user = await fetch(`http://localhost:3000/api/auth/login`, {
                    method: "POST",
                    body: JSON.stringify(Credentials),
                    headers: { "Content-Type": "application/json" },
                    }).then((res) => res.json());
                    if ( user && user.success) {
                      const { email, id, fullName } = user.user;
                      return { id, fullName, email };
                      } else {
                        throw new Error("Invalid credentials user");
                        }
                    
                        },
                         

        }),

  ],
    callbacks: {
       async session({ session, token }) {
      
      session.user = {
        ...session.user,
        //fullName: token.fullName,
        email: token.email,
      };
      return session;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
    secret: process.env.NEXTAUTH_SECRET,
  
}