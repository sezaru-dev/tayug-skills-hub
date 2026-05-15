export const dynamic = "force-dynamic"
import { SavedProviderRepository } from "@/features/saved-provider/saved-provider-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await verifySession([Role.PROVIDER])

    if (session instanceof NextResponse) {
      return session
    }

    const userId = session.user.id

    const savedProviders =
    await SavedProviderRepository.getSavedIds(userId)

    return NextResponse.json(savedProviders, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
