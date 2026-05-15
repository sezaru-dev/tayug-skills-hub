export const dynamic = "force-dynamic"
import { ProfileRepository } from "@/features/profile/profile-repository";
import { EditContactFormSchema } from "@/features/profile/schema";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

// Updates a service provider's phone number using the user ID from session. Requires authenticated PROVIDER role.
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
    const parsed = EditContactFormSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Route Schema Validation error:", parsed.error.issues);
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { phoneNumber } = parsed.data;

    // Proceed with updating profile about
    const updatedProfile = await ProfileRepository.upsertProfile({userId, phoneNumber})

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {

    let message = "Failed to update phone number";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}


