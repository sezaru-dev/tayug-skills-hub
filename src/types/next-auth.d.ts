import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "./roles";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role
      provider?: string; 
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: Role
    provider?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role
    provider?: string;
  }
}