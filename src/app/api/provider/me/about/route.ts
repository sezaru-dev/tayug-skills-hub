
import { ProfileRepository } from "@/features/profile/profile-repository";
import { EditAboutFormSchema } from "@/features/profile/schema";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

// Updates a service provider's profile about using the profile ID from session. Requires authenticated PROVIDER role.
export async function PATCH (req: Request) {

  //  Verify session
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) {
    return session // EARLY RETURN
  }
  const userId = session.user.id

  try {
    const body = await req.json();

    // Validation using Zod
    const parsed = EditAboutFormSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Route Schema Validation error:", parsed.error.issues);
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { about } = parsed.data;

    // Proceed with updating profile about
    const updatedProfile = await ProfileRepository.upsertProfile({userId, about})

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {

    let message = "Failed to update profile";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}