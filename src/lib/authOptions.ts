import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import AuthProvider from "next-auth/providers/auth0"

export const authOptions : NextAuthOptions ={
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
        })

  ]
}