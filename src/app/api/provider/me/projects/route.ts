export const dynamic = "force-dynamic"
import { ProfileRepository } from "@/features/profile/profile-repository";
import { CreateProjectSchema } from "@/features/profile/schema";
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

    const projects = await ProfileRepository.getProjectsByUserId(userId)

    return NextResponse.json(projects, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


export async function POST (req: Request) {
  try {
    //verify session
    const session = await verifySession([Role.PROVIDER])
  
    if (session instanceof NextResponse) {
      return session // EARLY RETURN
    }

    const userId = session.user.id


    const body = await req.json();
    const {imageUrl, imagePublicId, title, description, skills, liveUrl} = body

    // Validation using Zod
    const parsed = CreateProjectSchema.safeParse({ imageUrl, imagePublicId, title, description, skills, liveUrl });
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    //upload image to cloudinary and get URL (mocked for now)


    // Create project
    const category = await ProfileRepository.createProject({userId, imageUrl, imagePublicId, title, description, skills, liveUrl})
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 