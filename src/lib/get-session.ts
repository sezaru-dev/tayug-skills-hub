import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import type { Session } from "next-auth"

export async function getSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || !session.user?.role) {
    return null
  }

  return session
}