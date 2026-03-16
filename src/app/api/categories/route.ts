import { CategoryRepository } from "@/features/admin/categories/data/category-repository";
import { categoryFormSchema } from "@/features/admin/categories/schema";
import { verifySession } from "@/lib/verify-session";
import { Role } from "@/types/roles";
import { NextResponse } from "next/server";

export type GetParameters = {
  limit?: number
  sortBy?: "name" | "updatedAt"
  sortOrder?: "asc" | "desc"
  idAndNameOnly?: boolean
}

export async function GET (req: Request) {
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


    const categories = await CategoryRepository.getAll(params);

    return NextResponse.json(categories, { status: 200 })

  } catch (error) {
    console.error("[CATEGORY_CREATE]", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST (req: Request) {
  try {
    //verify session
    const sessionOrResponse = await verifySession([Role.ADMIN])
  
    if (sessionOrResponse instanceof NextResponse) {
      return sessionOrResponse // EARLY RETURN
    }


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

    // Create category
    const category = await CategoryRepository.create(parsed.data);
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 