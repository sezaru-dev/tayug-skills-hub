import { CategoryRepository } from "@/features/categories/data/category-repository";
import { categoryFormSchema } from "@/features/categories/schema";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

// This route will handle renaming a category. It will receive the new name and the category ID as parameters, and it will update the category in the database. It will also check for duplicate names and validate the input using Zod.
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

     // Validation using Zod
    const parsed = categoryFormSchema.safeParse({ name });
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }
    // Check for duplicate
    const isExisting = await CategoryRepository.isCategoryExists(name);
    if (isExisting) {
      return NextResponse.json(
        { error: "Category already exists." },
        { status: 409 }
      );
    }

    // Proceed with renaming the category
    const updatedCategoryName = await CategoryRepository.renameCategory(id, name);

    return NextResponse.json(updatedCategoryName, { status: 200 });
  } catch (error) {

    let message = "Failed to rename category";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}

//This route will handle deleting a category. It will receive the category ID as a parameter and a confirmation text in the request body. It will check if the confirmation text matches the category name before proceeding with the deletion. It will also verify the session to ensure that only admins can delete categories. 
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

    const isNameMatch = await CategoryRepository.crossmatchCategoryName(id, confirmText)
    if (!isNameMatch) {
      return NextResponse.json(
        { error: "Category name does not match." },
        { status: 409 }
      );
    }

    

    // Proceed with deleting the category
    const deleteCategory = await CategoryRepository.deleteCategory(id)
    return NextResponse.json(deleteCategory, { status: 200 });

  } catch (error) {
    
    let message = "Failed to delete category";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });  
  }
}