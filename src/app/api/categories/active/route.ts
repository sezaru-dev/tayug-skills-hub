export const dynamic = "force-dynamic"
import { CategoryRepository } from "@/features/categories/data/category-repository";
import { NextResponse } from "next/server";

export async function GET () {
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