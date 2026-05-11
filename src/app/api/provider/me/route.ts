import { ProfileRepository } from "@/features/profile/profile-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
  //  Verify session
    const session = await verifySession([Role.ADMIN, Role.USER, Role.PROVIDER])
  
    if (session instanceof NextResponse) {
      return session // EARLY RETURN
    }

    const id = session.user.id

  try {

    const profile = await ProfileRepository.getProfileById(id);

    return NextResponse.json(profile, { status: 200 })

  } catch (error) {
    console.error("[GET_PROFILE", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}