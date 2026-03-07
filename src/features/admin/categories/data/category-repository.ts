import { prisma } from "@/lib/prisma"
import { generateSlug } from "../utils"

export type CreateCategoryInput = {
  name: string
}

export const CategoryRepository = {
  async create({ name }: CreateCategoryInput) {
    const slug = generateSlug(name)

    return prisma.skillCategory.create({
      data: {
        name,
        slug,
        isActive: false, // default status
      },
    })
  },
  async isCategoryExists(name: string) {
    const category = await prisma.skillCategory.findUnique({
      where: {
        name,
      },
    })
    return !!category
  },
  async getAll() {
    return prisma.skillCategory.findMany({
      orderBy: [
        { updatedAt: "desc" },
        { createdAt: "desc" },
      ],
    })
  },
  async getAllButIdAndNameOnly() {
    return prisma.skillCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  },
  async toggleIsActive(id: string) {
    const category = await prisma.skillCategory.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");

    return prisma.skillCategory.update({
      where: { id },
      data: { isActive: !category.isActive }, // flip actual DB value
    });
  },
  async renameCategory(id: string, name: string) {
    const slug = generateSlug(name)

    return prisma.skillCategory.update({
      where: { id },
      data: {
        name,
        slug,
      },
    })

  },
  async crossmatchCategoryName(id: string, name:string){
    const category = await prisma.skillCategory.findUnique({
      where: { id },
    })
    if (!category) return false;
    return category.name === name;
  },
  async deleteCategory(id: string) {
    return prisma.skillCategory.delete({
      where: { id },
    })
  }

}

