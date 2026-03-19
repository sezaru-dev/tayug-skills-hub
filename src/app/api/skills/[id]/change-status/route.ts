import { SkillRepository } from "@/features/admin/skills/skill-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

// Updates a skill's active status by ID (ADMIN only) using the `isActive` boolean from the request body.
export async function PATCH (req: Request, { params }: { params: { id: string } }) {
  
  //  Verify session
  const sessionOrResponse = await verifySession([Role.ADMIN])
  
  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse // EARLY RETURN
  }
  
  try {
    const { id } = params;
    const { isActive } = await req.json();
    if (typeof isActive !== "boolean") {
      return NextResponse.json({ error: "Invalid 'isActive' value" }, { status: 400 });
    }

    const updatedSkillStatus  = await SkillRepository.changeStatus(id, isActive);

    return NextResponse.json(updatedSkillStatus, { status: 200 });
  } catch (error) {
    console.error(error);
    
    let message = "Failed to update skill status";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
    
  }
}