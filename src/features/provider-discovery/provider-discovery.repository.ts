import { prisma } from "@/lib/prisma"

export const ProviderDiscoveryRepository = {
  async getProfileById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,

        profile: {
          select: {
            fullname: true,
            headline: true,
            barangay: true,
            about: true,
            phoneNumber: true,
            telNumber: true,
          },
        },

        providerSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },

projects: {
  select: {
    id: true,
    title: true,
    description: true,
    liveUrl: true,
    imageUrl: true,

    skills: {
      select: {
        skill: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  },
}
      },
    })
  },
  async getAdminProviders() {
    const providers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        createdAt: true,

        profile: {
          select: {
            fullname: true,
            barangay: true,
            isPublished: true
          },
        },

        providerSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    return providers.map((user) => ({
      id: user.id,
      fullname: user.profile?.fullname,
      email: user.email,
      createdAt: user.createdAt,
      isPublished: user.profile?.isPublished,
      barangay: user.profile?.barangay ?? "",

      skills: user.providerSkills.map((ps) => ({
        id: ps.skill.id,
        name: ps.skill.name,
      })),
    }))
  }
}