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
    return prisma.skillCategory.findMany()
  },
  async getAllButIdAndNameOnly() {
    return prisma.skillCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  },
}

