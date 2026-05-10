import { prisma } from "@/lib/prisma";

type updateAdminAccountInfoProps ={
  id: string
  name: string
  email: string
}

export const AccountRepository = {
  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },
  

  async updatePassword(userId: string, hashedPassword: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  },
  async deleteUserById(id: string) {
    const { id: deletedUserId } = await prisma.user.delete({
    where: { id },
    select: { id: true },
    })

    return {
      deletedUserId: { deletedUserId },
    }
  },
    async getAccountInfoById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email:true
      }
    });
  },
  async updateAccountInfo({id, name, email}:updateAdminAccountInfoProps){
    return await prisma.user.update({
      where: {id},
      data: {
        name: name,
        email
      }
    })
  },
async isEmailTaken(currentEmail: string, newEmail: string) {
  // email did not change
  if (currentEmail === newEmail) {
    return false
  }

  const existingEmail = await prisma.user.findUnique({
    where: {
      email: newEmail,
    },
    select: {
      id: true,
    },
  })

  return !!existingEmail
}
};