export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, hashPassword } from "@/lib/auth-bcryptjs";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { AccountRepository } from "@/features/account/account.repository";

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession([Role.PROVIDER, Role.ADMIN]);

    if (session instanceof NextResponse) {
      return session;
    }

    const userId = session.user.id;

    const { currentPassword, newPassword } = await req.json();

    // 1. validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 2. find user
    const user = await AccountRepository.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "User has no password set" },
        { status: 400 }
      );
    }

    // 3. verify current password
    const isMatch = await verifyPassword(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // 4. prevent same password reuse
    const isSameAsCurrent = await verifyPassword(
      newPassword,
      user.password
    );

    if (isSameAsCurrent) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 }
      );
    }

    // 5. hash new password
    const hashedPassword = await hashPassword(newPassword);

    // 6. update password
    await AccountRepository.updatePassword(user.id, hashedPassword);

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    let message = "Failed to update password";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}