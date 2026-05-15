import { CategoryRepository } from "@/features/categories/data/category-repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET (_req: NextRequest) {
  try {

    const activeCategories = await CategoryRepository.getAllActiveCategories();

    return NextResponse.json(activeCategories, { status: 200 })

  } catch (error) {
    console.error("[GET_ACTIVE_CATEGORIES]", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}