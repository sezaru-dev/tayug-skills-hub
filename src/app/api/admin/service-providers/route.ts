import { NextResponse } from "next/server"
import { verifySession } from "@/lib/verify-session"
import { Role } from "@/types/roles"
import { ProviderDiscoveryRepository } from "@/features/provider-discovery/provider-discovery.repository"

export async function GET() {
  try {
    //  Verify session
      const session = await verifySession([Role.ADMIN])
    
      if (session instanceof NextResponse) {
        return session
      }

    const users = await ProviderDiscoveryRepository.getAdminProviders()

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error("GET /api/admin/service-providers error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch providers",
      },
      { status: 500 }
    )
  }
}