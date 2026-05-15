import { prisma } from "@/lib/prisma"

export const SavedProviderRepository = {
  async add({ userId, providerId }: { userId: string; providerId: string }) {
    return prisma.savedProvider.create({
      data: {
        userId,
        providerId,
      },
    })
  },
  async remove({ userId, providerId }: { userId: string; providerId: string }) {
    return prisma.savedProvider.delete({
      where: {
        userId_providerId: {
          userId,
          providerId,
        },
      },
    })
  },
  async getSavedIds(userId: string) {
    const saved = await prisma.savedProvider.findMany({
      where: { userId },
      select: { providerId: true },
    })

    return saved.map((s) => s.providerId)
  },
async getSavedProviders(userId: string) {
  const saved = await prisma.savedProvider.findMany({
    where: {
      userId,
      provider: {
        profile: {
          isPublished: true,
        },
      },
    },

    select: {
      provider: {
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
                },
              },
            },
          },
        },
      },
    },
  })


  return saved.map((item) => {
    const provider = item.provider

    const { providerSkills, profile } = provider

    return {
      id: provider.id,
      fullname: profile?.fullname ?? "",
      barangay: profile?.barangay ?? "",
      skills: providerSkills.map((ps) => ps.skill),
    }
  })
}

}