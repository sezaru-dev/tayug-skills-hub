import { AccountRepository } from "@/features/account/account.repository";
import { AdminAccountDetailsSchema } from "@/features/account/schema";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest){
  try {
    const session = await verifySession([Role.PROVIDER, Role.ADMIN]);
    
    if (session instanceof NextResponse) {
      return session;
    }

    const id = session.user.id;
    const currentEmail = session.user.email;
    if (!currentEmail) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 400 }
      )
    }
    const body = await req.json()

    // Validation using Zod
    const parsed = AdminAccountDetailsSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Route Schema Validation error:", parsed.error.issues);
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email } = parsed.data;

    const isEmailTaken = await AccountRepository.isEmailTaken(currentEmail, email)

    if (isEmailTaken) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      )
    }

    await AccountRepository.updateAccountInfo({id, name, email});

    return NextResponse.json({
      message: "Account info updated successfully",
    });
  } catch (error) {
    let message = "Failed to update account info";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 }); 
  }
}