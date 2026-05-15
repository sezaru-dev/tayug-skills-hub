export const dynamic = "force-dynamic"
import { SkillRepository } from "@/features/skills/skill-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

export async function GET (){
  //  Verify session
  const sessionOrResponse = await verifySession([Role.ADMIN, Role.USER, Role.PROVIDER])

  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse // EARLY RETURN
  }

  try {

      const skills = await SkillRepository.getActiveSkills();
      return NextResponse.json(skills, { status: 200 })
  
    } catch (error) {
      console.error("[SKILL_GET]", error)
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      )
    }
}