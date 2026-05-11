import { RenameSkillFormSchema } from "@/features/skills/schema";
import { SkillRepository } from "@/features/skills/skill-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// This route will handle renaming a skill. It will receive the new name and the skill ID as parameters, and it will update the skill in the database. It will also check for duplicate names and validate the input using Zod.
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
    const parsed = RenameSkillFormSchema.safeParse({ name, categoryId });
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

    // Proceed with renaming the skill
    const updatedSkillName = await SkillRepository.renameSkill(id, name);

    return NextResponse.json(updatedSkillName, { status: 200 });
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
    let message = "Failed to rename skill";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}

//This route will handle deleting a skill. It will receive the skill ID as a parameter and a confirmation text in the request body. It will check if the confirmation text matches the skill name before proceeding with the deletion. It will also verify the session to ensure that only admins can delete skills.
export async function DELETE (req: Request, { params }: { params: { id: string } }) {
  
  //  Verify session
  const sessionOrResponse = await verifySession([Role.ADMIN])
  
  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse // EARLY RETURN
  }
  
  
  try {
    const { id } = params;

    const body = await req.json()
    const { confirmText } = body

    if (!id || !confirmText) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 })
    }

    const isNameMatch = await SkillRepository.matchSkillName(id, confirmText)
    if (!isNameMatch) {
      return NextResponse.json(
        { error: "Skill name does not match." },
        { status: 409 }
      );
    }

    // Proceed with deleting the skill
    const deleteSkill = await SkillRepository.deleteSkill(id)
    return NextResponse.json(deleteSkill, { status: 200 });

  } catch (error) {
    
    let message = "Failed to delete skill";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}