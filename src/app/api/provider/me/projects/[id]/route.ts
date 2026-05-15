export const dynamic = "force-dynamic"
import { ProfileRepository } from "@/features/profile/profile-repository";
import cloudinary from "@/lib/cloudinary";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await verifySession([Role.PROVIDER])

    if (session instanceof NextResponse) {
      return session
    }

    const userId = session.user.id
    const projectId = params.id

    const project = await ProfileRepository.getProjectByIdAndUserId(projectId, userId)

    return NextResponse.json(project, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest,{ params }: { params: { id: string }}) {
  //verify session, return session if true
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) {
    return session
  }

  try {
    const projectId = params?.id

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    //delete project, ensure it belongs to the user (security check)
    //return imagepublicId for deletion
    const result = await ProfileRepository.deleteProject({
      userId: session.user.id,
      projectId,
    })

    //delete image from cloudinary if exists, ignore errors
    if (result.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(result.imagePublicId)
      } catch (err) {
        // Don't fail request if Cloudinary fails
        console.error("Cloudinary deletion failed:", err)
      }
    }

    return NextResponse.json(
      {
        success: true,
        deletedProjectId: result.deletedProjectId,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
    { error: (error as Error).message }, // 👈 expose real error
    { status: 500 }
  )
  }
}

