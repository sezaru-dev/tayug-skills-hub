import { prisma } from "@/lib/prisma"

export const UserRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  },

  findRoleById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { role: true },
    })
  },
}
