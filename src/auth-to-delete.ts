/* 
import NextAuth from "next-auth"

import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma";
import { verifyPassword } from "./lib/auth-bcryptjs";
import { Role } from "./types/roles";
import { NextAuthOptions } from "next-auth";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("CredentialsSignin");
        }
 
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) throw new Error("CredentialsSignin");
 
        const isValid = await verifyPassword(credentials.password as string, user.password as string);
        if (!isValid) throw new Error("CredentialsSignin");
 

        return { id: user.id, name: user.name, email: user.email, role: user.role as unknown as Role };
        
      },
    }),
  ],
  session: {
    strategy: "jwt", 
    maxAge: 60 * 60, 
    updateAge: 60 * 30
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login", 
  },
  callbacks: {
    async jwt({ token, user, account }) {

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.email = user.email;
        token.provider = account?.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.email = token.email as string;
        session.user.name = token.name;
      }
      return session;
    },
  }
}) */