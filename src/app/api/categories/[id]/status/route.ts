import { CategoryRepository } from "@/features/admin/categories/data/category-repository";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

export async function PATCH (req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  //  Verify session
  const sessionOrResponse = await verifySession([Role.ADMIN])

  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse // EARLY RETURN
  }

  try {
    const updatedCategoryStatus  = await CategoryRepository.toggleIsActive(id);

    return NextResponse.json(updatedCategoryStatus, { status: 200 });
  } catch (error) {
    console.error(error);
    
    let message = "Failed to toggle category status";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
    
  }
}