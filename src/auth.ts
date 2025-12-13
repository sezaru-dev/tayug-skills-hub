
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma";
import { verifyPassword } from "./lib/auth-bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Ensure credentials are present
        if (!credentials?.email || !credentials?.password) {
          throw new Error("CredentialsSignin");
        }
 
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) throw new Error("CredentialsSignin");
 
        const isValid = await verifyPassword(credentials.password as string, user.password as string);
        if (!isValid) throw new Error("CredentialsSignin");
 
        // return user object with their profile data
        return { id: user.id, name: user.name, email: user.email };
        
      },
    }),
  ],
  session: {
    strategy: "jwt", // Switch to JWT-based sessions
    maxAge: 60 * 60, //1 hour
    updateAge: 60 * 30 //30 mins
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login", 
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // On first login, add user data to token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.provider = account?.provider;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose extra token fields to session object
      if (token && session.user) {
        if (typeof token.id === "string") {
          session.user.id = token.id;
        }
        if (typeof token.provider === "string") {
          session.user.provider = token.provider;
        }
      }
      return session;
    },
  }
})