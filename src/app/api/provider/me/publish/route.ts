
import { ProfileRepository } from "@/features/profile/profile-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

// This route is for publishing the provider's profile, making it visible to users browsing for service providers.
export async function PATCH (req: Request) {

  //  Verify session
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) {
    return session // EARLY RETURN
  }
  const userId = session.user.id

  try {

    // Proceed with updating profile isPublished status to true
    const updatedProfile = await ProfileRepository.publishProfile(userId);

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {

    let message = "Failed to publish profile";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}


