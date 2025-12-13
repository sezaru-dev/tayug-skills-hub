import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider?: string; // added this
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    provider?: string; // added this
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string;
  }
}