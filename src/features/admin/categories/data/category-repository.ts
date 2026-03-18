import { prisma } from "@/lib/prisma"
import { generateSlug } from "../utils"
import { GetParameters } from "@/app/api/categories/route"
import { Prisma } from "@prisma/client"

export type CreateCategoryInput = {
  name: string
}

const SORT_FIELDS = ["name", "updatedAt"] as const
type SortField = (typeof SORT_FIELDS)[number]

const SORT_ORDERS = ["asc", "desc"] as const
type SortOrderType = (typeof SORT_ORDERS)[number]

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
  async getAll(params?: GetParameters) {
    const {
      limit,
      sortBy = "updatedAt",
      sortOrder = "desc",
      idAndNameOnly = false,
    } = params || {}

    // Validate sortBy
    const safeSortBy: SortField = SORT_FIELDS.includes(sortBy as SortField)
      ? (sortBy as SortField)
      : "updatedAt"

    // Validate sortOrder
    const safeSortOrder: SortOrderType = SORT_ORDERS.includes(sortOrder as SortOrderType)
      ? (sortOrder as SortOrderType)
      : "desc"

    // Base query
    const query: Prisma.SkillCategoryFindManyArgs = {
      orderBy: { [safeSortBy]: safeSortOrder },
    }

    // Apply limit if provided
    if (limit && !isNaN(limit) && limit > 0) {
      query.take = limit
    }

    // Only id + name if requested
    if (idAndNameOnly) {
      query.select = {
        id: true,
        name: true,
      }
    } else {
      // Include full skills array
      query.include = {
        skills: {
/*           where: {
            isActive: true, // only include active skills
          }, */
          orderBy: {
            name: "asc", // sort skills alphabetically A → Z
          },
        }
      }
    }

    // Execute query
    return prisma.skillCategory.findMany(query)
  },
  async getActiveCategories() {
  return prisma.skillCategory.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc", // A → Z
    },
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
  async changeStatus(id: string, isActive: boolean) {
    const category = await prisma.skillCategory.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");

    return prisma.skillCategory.update({
      where: { id },
      data: { isActive },
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
    const skillCount = await prisma.skill.count({
      where: { categoryId: id },
    });

    if (skillCount > 0) {
      throw new Error("Cannot delete category, it still has skills attached.");
    }
    
    return prisma.skillCategory.delete({
      where: { id },
    })
  }

}

