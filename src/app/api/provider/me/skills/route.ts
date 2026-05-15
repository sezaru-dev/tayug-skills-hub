
import { ProfileRepository } from "@/features/profile/profile-repository";
import { EditSkillsFormSchema } from "@/features/profile/schema";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

export async function GET () {

  //  Verify session
  const session = await verifySession([Role.PROVIDER])
  
  if (session instanceof NextResponse) {
    return session // EARLY RETURN
  }
  const userId = session.user.id

  try {

    const skills = await ProfileRepository.getUserSkills(userId)

    return NextResponse.json(skills, { status: 200 })
  } catch (error) {

    let message = "Failed to fetch User Skills";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}


// Updates a service provider's profile header (fullname, headline, barangay) using the profile ID from session. Requires authenticated PROVIDER role.
export async function PATCH (req: Request) {

  //  Verify session
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) {
    return session // EARLY RETURN
  }
  const id = session.user.id

  try {
    const body = await req.json();
    const {skills} = body

     // Validation using Zod
     const parsed = EditSkillsFormSchema.safeParse({ skills });
    if (!parsed.success) {
      console.error("Route Schema Validation error:", parsed.error.issues);
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // Proceed with updating 

    await ProfileRepository.updateSkills({userId:id, skills})

    return NextResponse.json(
      { message: "Skills updated successfully" },
      { status: 200 }
    )
  } catch (error) {

    let message = "Failed to update User Skills";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}