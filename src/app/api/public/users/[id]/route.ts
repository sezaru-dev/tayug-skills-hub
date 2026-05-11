import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        role: false,

        profile: {
          select: {
            fullname: true,
            headline: true,
            barangay: true,
            about: true,
            phoneNumber: true,
            telNumber: true,
            isPublished: true,
          },
        },

        providerSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
                slug: false,

              },
            },
          },
        },

        projects: {
          select: {
            id: true,
            title: true,
            description: true,
            liveUrl: true,
            imageUrl: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    // flatten providerSkills (cleaner for frontend)
    const skills =
      user.providerSkills?.map((ps) => ({
        id: ps.skill.id,
        name: ps.skill.name,
      })) ?? []

    const response = {
      id: user.id,
      name: user.name,
      image: user.image,

      about: {
        fullname: user.profile?.fullname,
        headline: user.profile?.headline,
        description: user.profile?.about,
        barangay: user.profile?.barangay,
      },

      contact: {
        phoneNumber: user.profile?.phoneNumber,
        telNumber: user.profile?.telNumber,
      },

      skills, //  now included properly

      projects: user.projects,
    }

    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("GET /api/users/[id] error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user profile",
      },
      { status: 500 }
    )
  }
}