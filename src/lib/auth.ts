import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Role } from "@/types/roles";
import { loginWithCredentials } from "@/features/auth/login-with-credentials";
import { UserRepository } from "@/server/repositories/user.repository";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials are present
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Return user data to store in JWT
        return  loginWithCredentials(
          credentials.email,
          credentials.password
        )
      },
    }),
  ],

  session: {
    strategy: "jwt", // Switch to JWT-based sessions
    maxAge: 60 * 60 * 24,   // 1 day
    updateAge: 60 * 60 * 6, // refresh every 6 hours
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // On first login, add user data to token
      // Runs ONLY on login or token update
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role as Role;

        if (account?.provider) {
          token.provider = account.provider;
        }
      }
      
      return token
    },

    async session({ session, token }) {
      
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as Role;
        session.user.provider = token.provider as string;
      }

      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login"
  }
};