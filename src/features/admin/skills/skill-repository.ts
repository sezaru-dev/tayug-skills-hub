import { prisma } from "@/lib/prisma"
import { generateSlug } from "../categories/utils"
import { GetParameters } from "@/app/api/categories/route"
import { Prisma } from "@prisma/client"

export type CreateSkillInputType = {
  name: string
  categoryId: string
}

const SORT_FIELDS = ["name", "updatedAt"] as const
type SortField = (typeof SORT_FIELDS)[number]

const SORT_ORDERS = ["asc", "desc"] as const
type SortOrderType = (typeof SORT_ORDERS)[number]

export const SkillRepository = {
  async create({ name, categoryId }: CreateSkillInputType) {
    const slug = generateSlug(name)

    return prisma.skill.create({
      data: {
        name,
        slug,
        categoryId,
        isActive: false, // default status
      },
    })
  },
  async isSkillExists(name: string, categoryId: string, excludeId?: string) {
    const skill = await prisma.skill.findFirst({
    where: {
      name,
      categoryId,
      ...(excludeId && { NOT: { id: excludeId } }),
    },
  });

    return !!skill;
  },
  async getSkills(params?: GetParameters) {
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
    
        const query: Prisma.SkillFindManyArgs = {
          orderBy: {
            [safeSortBy]: safeSortOrder,
          },
          include: {
            category: {
              select: { name: true }
            }
          }
        }
    
        if (limit && !isNaN(limit) && limit > 0) {
          query.take = limit
        }
    
        if (idAndNameOnly) {
          query.select = {
            id: true,
            name: true,
          }
        }
    
        return prisma.skill.findMany(query)
  },
  async renameSkill(id: string, name: string) {
  const slug = generateSlug(name)

  return prisma.skill.update({
    where: { id },
    data: {
      name,
      slug,
    },
  })

  },
  async changeCategory(id: string, categoryId: string) {
    return prisma.skill.update({
      where: { id },
      data: { categoryId },
    })
  },
  async changeStatus(id: string, isActive: boolean) {
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new Error("skill not found");

    return prisma.skill.update({
      where: { id },
      data: { isActive }, 
    });
  },
  async matchSkillName(id: string, name:string){
    const skill = await prisma.skill.findUnique({
      where: { id },
    })
    if (!skill) return false;
    return skill.name === name;
  },
  async deleteSkill(id: string) {
    return prisma.skill.delete({
      where: { id },
    })
  }
}

