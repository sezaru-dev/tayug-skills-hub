export const dynamic = "force-dynamic"
import { AddSkillFormSchema } from "@/features/skills/schema"
import { SkillRepository } from "@/features/skills/skill-repository"
import { verifySession } from "@/lib/verify-session"
import { Role } from "@/types/roles"
import { NextResponse } from "next/server"
import { GetParameters } from "../categories/route"
import { Prisma } from "@prisma/client"

export async function GET (req: Request){
  //  Verify session
  const sessionOrResponse = await verifySession([Role.ADMIN, Role.USER, Role.PROVIDER])

  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse // EARLY RETURN
  }

  try {
      const { searchParams } = new URL(req.url)
  
      const params: GetParameters = {
        limit: searchParams.get("limit")
          ? Number(searchParams.get("limit"))
          : undefined,
  
        sortBy: searchParams.get("sortBy") as "name" | "updatedAt" | undefined,
  
        sortOrder: searchParams.get("sortOrder") as "asc" | "desc" | undefined,
  
        idAndNameOnly: searchParams.get("idAndNameOnly") === "true",
      }
  
  
      const skills = await SkillRepository.getSkills(params);
  
      return NextResponse.json(skills, { status: 200 })
  
    } catch (error) {
      console.error("[SKILL_GET]", error)
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      )
    }
}

export async function POST (req: Request){
  //  Verify session
    const sessionOrResponse = await verifySession([Role.ADMIN])
  
    if (sessionOrResponse instanceof NextResponse) {
      return sessionOrResponse // EARLY RETURN
    }

    try {
      const {name, categoryId} = await req.json();


      const parsed = AddSkillFormSchema.safeParse({ name, categoryId });
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0].message },
          { status: 400 }
        );
      }

      // Check for duplicate
      const isExisting = await SkillRepository.isSkillExists(name, categoryId);
      if (isExisting) {
        return NextResponse.json(
          { error: "Skill already exists." },
          { status: 409 }
        );
      }

      // Create skill
      const skill = await SkillRepository.create(parsed.data);
      return NextResponse.json(skill, { status: 201 });
      
    } catch (error) {
    
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return NextResponse.json(
            { error: "Skill already exists in this category." },
            { status: 409 }
          );
        }
    
        let message = "Failed to change skill category";
        if (error instanceof Error) {
          message = error.message;
        }
        return NextResponse.json({ error: message }, { status: 500 });  
      }
}