// lib/current-user.ts
import type { Session } from "next-auth"
import { Role } from "@/types/roles"

export type CurrentUser = {
  id: string
  role: Role
  name: string | null
  email: string | null
  image?: string | null
}

// Convert a NextAuth session to CurrentUser
export function toCurrentUser(session: Session): CurrentUser {
  if (!session.user) throw new Error("Session has no user")
  return {
    id: session.user.id,
    role: session.user.role,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
  }
}
