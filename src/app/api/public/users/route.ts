export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const search = searchParams.get("search") ?? ""
    const categoriesParam = searchParams.get("categories")
    const cursor = searchParams.get("cursor")
    const take = Number(searchParams.get("take")) || 8

    const categories = categoriesParam
      ? categoriesParam.split(",").filter(Boolean)
      : []

    const providers = await prisma.user.findMany({
      where: {
        role: "PROVIDER",

        profile: {
          isPublished: true,
        },

        AND: [
          search
            ? {
                OR: [
                  {
                    profile: {
                      fullname: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    providerSkills: {
                      some: {
                        skill: {
                          name: {
                            contains: search,
                            mode: "insensitive",
                            },
                        },
                      },
                    },
                  },
                ],
              }
            : {},

          categories.length > 0
            ? {
                providerSkills: {
                  some: {
                    skill: {
                      category: {
                        slug: {
                          in: categories, //  SLUG ONLY
                        },
                      },
                    },
                  },
                },
              }
            : {},
        ],
      },

      orderBy: {
        id: "asc", //  must match cursor
      },

      take: take + 1, //  check if next page exists

      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,

      select: {
        id: true,

        profile: {
          select: {
            fullname: true,
            barangay: true,
          },
        },

        providerSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
                slug: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    // pagination logic
    const hasNextPage = providers.length > take
    const items = hasNextPage ? providers.slice(0, -1) : providers

    const formatted = items.map((user) => ({
      id: user.id,
      fullname: user.profile?.fullname ?? "",
      barangay: user.profile?.barangay ?? "",
      skills: user.providerSkills.map((ps) => ({
        id: ps.skill.id,
        name: ps.skill.name,
        category: ps.skill.category.name,
      })),
    }))

    return NextResponse.json({
      data: formatted,
      nextCursor: hasNextPage
        ? items[items.length - 1].id
        : null,
    }, { status: 200 })
  } catch (error) {
    console.error("GET /api/providers error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch providers",
      },
      { status: 500 }
    )
  }
}