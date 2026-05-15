export const dynamic = "force-dynamic"
import { AccountRepository } from "@/features/account/account.repository";
import { DeleteAccountRouteSchema } from "@/features/account/schema";
import { ProfileRepository } from "@/features/profile/profile-repository";
import { verifyPassword } from "@/lib/auth-bcryptjs";
import cloudinary from "@/lib/cloudinary";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const session = await verifySession([Role.PROVIDER])

    if (session instanceof NextResponse) {
      return session
    }

    const userId = session.user.id
    const body = await req.json()

    const parsed = DeleteAccountRouteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { password } = parsed.data

    // 1. verify user
    const user = await AccountRepository.findById(userId)

    if (!user?.password) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const isMatch = await verifyPassword(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      )
    }

    // 2. collect cloudinary assets
    const imagePublicIds =
      await ProfileRepository.getProjectImagePublicIdsByUserId(userId)

    // 3. STRICT: delete cloudinary FIRST (must succeed)
    if (imagePublicIds.length > 0) {
      try {
        await Promise.all(
          imagePublicIds.map((id) =>
            cloudinary.uploader.destroy(id)
          )
        )
      } catch (err) {
        console.error("Cloudinary deletion failed:", err)

        return NextResponse.json(
          {
            error:
              "Failed to delete external assets. Account deletion aborted.",
          },
          { status: 503 }
        )
      }
    }

    // 4. only after success → delete DB
    const result = await AccountRepository.deleteUserById(userId)

    return NextResponse.json({
      success: true,
      deletedUserId: result.deletedUserId,
    })
  } catch (error) {
    console.error("Error deleting user:", error)

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}