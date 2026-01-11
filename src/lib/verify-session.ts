import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { NextResponse } from "next/server"
import type { Session } from "next-auth"
import { Role } from "@/types/roles"

export async function verifySession(
  allowedRoles?: Role[]
): Promise<Session | NextResponse> {
  const session = await getServerSession(authOptions)

  // Authentication
  if (!session || !session.user?.email || !session.user?.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Authorization (if restricted)
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return session
}
