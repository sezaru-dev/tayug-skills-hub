import { ChangeCategoryFormSchema } from "@/features/admin/skills/schema";
import { SkillRepository } from "@/features/admin/skills/skill-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// This route will handle changing the category of a skill. It will receive the new category ID and the skill ID as parameters, and it will update the skill in the database.
export async function PATCH (req: Request, { params }: { params: { id: string } }) {

  const { id } = params;

  //  Verify session
  const sessionOrResponse = await verifySession([Role.ADMIN])

  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse // EARLY RETURN
  }

  try {
    const body = await req.json();
    const name = body.name;
    const categoryId = body.categoryId;

     // Validation using Zod
    const parsed = ChangeCategoryFormSchema.safeParse({ name, categoryId });
    if (!parsed.success) {
      console.error("Route Schema Validation error:", parsed.error.issues);
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // Check for duplicate
    const isExisting = await SkillRepository.isSkillExists(name, categoryId, id);
    if (isExisting) {
      return NextResponse.json(
        { error: "Skill already exists in this category." },
        { status: 409 }
      );
    }

    // Proceed with changing the skill's category
    const updatedSkillCategory = await SkillRepository.changeCategory(id, categoryId);

    return NextResponse.json(updatedSkillCategory, { status: 200 });
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