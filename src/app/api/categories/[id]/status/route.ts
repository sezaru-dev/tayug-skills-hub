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
    const { isActive } = await req.json();
    if (isActive === undefined) {
      return NextResponse.json({ error: "isActive field is required" }, { status: 400 });
    }

    const updatedCategoryStatus  = await CategoryRepository.changeStatus(id, isActive);

    return NextResponse.json(updatedCategoryStatus, { status: 200 });
  } catch (error) {
    console.error(error);
    
    let message = "Failed to change category status";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
    
  }
}