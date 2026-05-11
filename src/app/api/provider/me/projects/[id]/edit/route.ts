import { ProfileRepository } from "@/features/profile/profile-repository";
import { EditProjectSchema } from "@/features/profile/schema";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) return session

  const userId = session.user.id

  try {
    const body = await req.json()

    const {
      projectId,
      imageUrl,
      imagePublicId,
      title,
      description,
      skills,
      liveUrl,
    } = body

    const parsed = EditProjectSchema.safeParse({
      projectId,
      imageUrl,
      imagePublicId,
      title,
      description,
      skills,
      liveUrl,
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const project = await ProfileRepository.updateProject({
      userId,
      projectId,
      imageUrl,
      imagePublicId,
      title,
      description,
      skills,
      liveUrl,
    })

    return NextResponse.json(project, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update project" },
      { status: 500 }
    )
  }
}