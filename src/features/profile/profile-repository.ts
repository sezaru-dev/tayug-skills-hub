import { prisma } from "@/lib/prisma"

import { SkillWithCategory } from "./components/skills/EditSkillsDialog"
import { ProfileHeaderProps } from "../service-provider.types"

export type UpsertProfileInput = {
  userId: string
  fullname?: string
  headline?: string
  barangay?: string
  about?: string
  phoneNumber?: string
}

type CreateProjectInput = {
  userId: string
  title: string
  description: string
  liveUrl?: string
  imageUrl: string
  imagePublicId: string
  skills: string[]
}

type UpdateProjectInput = {
  userId: string
  projectId: string
  imageUrl: string
  imagePublicId: string
  title: string
  description: string
  liveUrl?: string
  skills: string[]
}

type DeleteProjectInput = Pick<UpdateProjectInput, "userId" | "projectId">

export const ProfileRepository = {
  async getProfileById(id: string) {
    return prisma.profile.findUnique({
      where: { id },
    })
  },
  async createInitialProfile(id: string) {
    return prisma.profile.create({
      data: {
        id,
        fullname: "",
        headline: "",
        barangay: "",
        about: "",
        phoneNumber: "",
        telNumber: null,
        isPublished: false,
      },
    })
  },
  async upsertProfile({userId,fullname,headline,barangay,about,phoneNumber}: UpsertProfileInput) {
    return prisma.profile.upsert({
      where: { id: userId },
      create: {
        id: userId,
        fullname: fullname ?? "",
        headline: headline ?? "",
        barangay: barangay ?? "",
        about: about ?? "",
        phoneNumber: phoneNumber ?? "",
        telNumber: null,
        isPublished: false,
      },
      update: {
        ...(fullname !== undefined && { fullname }),
        ...(headline !== undefined && { headline }),
        ...(barangay !== undefined && { barangay }),
        ...(about !== undefined && { about }),
        ...(phoneNumber !== undefined && { phoneNumber }),
      },
    })
  },
  async updateProfileHeader({id, fullname, headline, barangay}:ProfileHeaderProps) {
    return prisma.profile.update({
      where: { id },
      data: {
        fullname,
        headline,
        barangay,
      },
  })
  },
/*   async updateAbout({ id, about }: Pick<ProfileType, "id" | "about">) {
    return prisma.profile.update({
      where: { id },
      data: {
        about
      },
    })
  }, */
/*   async updateProviderSkills(userId: string, skills: string[]) {
    // 1. get existing
    const existing = await prisma.providerSkills.findMany({
      where: { userId },
      select: { skillId: true },
    })

    const existingSkillIds = existing.map(s => s.skillId)

    // 2. diff
    const toAdd = skills.filter(id => !existingSkillIds.includes(id))
    const toRemove = existingSkillIds.filter(id => !skills.includes(id))

    // 3. transaction
    return prisma.$transaction([
      prisma.providerSkills.deleteMany({
        where: {
          userId,
          skillId: { in: toRemove },
        },
      }),

      prisma.providerSkills.createMany({
        data: toAdd.map(skillId => ({
          userId,
          skillId,
        })),
        skipDuplicates: true,
      }),
    ])
  }, */
  async updateSkills({
    userId,
    skills,
  }: {
    userId: string
    skills: string[]
  }) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        providerSkills: {
          // remove skills not in incoming array
          deleteMany: {
            skillId: { notIn: skills },
          },

          // add new ones (skip duplicates handled by DB)
          createMany: {
            data: skills.map(skillId => ({
              skillId,
            })),
            skipDuplicates: true,
          },
        },
      },
    })
  },
  async getUserSkills(userId: string): Promise<SkillWithCategory[]> {
    const result = await prisma.providerSkills.findMany({
      where: { userId },
      select: {
        skill: {
          select: {
            id: true,
            name: true,
            isActive: true,
            category: {
              select: {
                id: true,
                name: true,
                isActive: true,
              },
            },
          },
        },
      },
    })

    return result.map((data):SkillWithCategory => data.skill)
  },
  async createProject({userId,imageUrl,imagePublicId,title,description,liveUrl,skills}: CreateProjectInput) {
    return prisma.$transaction(async (tx) => {
      // 1. create project first
      const project = await tx.project.create({
        data: {
          userId,
          title,
          description,
          liveUrl,
          imageUrl,
          imagePublicId,
        },
      })

      // 2. create project-skill relations
      await tx.projectSkill.createMany({
        data: skills.map((skillId) => ({
          projectId: project.id,
          skillId,
        })),
        skipDuplicates: true,
      })

      // 3. return full project with relations
      return tx.project.findUnique({
        where: { id: project.id },
        include: {
          skills: {
            include: {
              skill: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      })
    })
  },
  async getProjectsByUserId(userId: string) {
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        liveUrl: true,
        imageUrl: true,
        imagePublicId: true,
        createdAt: true,
        updatedAt: true,

        skills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
                isActive: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return projects.map((project) => ({
      ...project,
      skills: project.skills.map((s) => s.skill),
    }))
  },
  async getProjectByIdAndUserId(projectId: string, userId: string) {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        liveUrl: true,
        imageUrl: true,
        imagePublicId: true,
        createdAt: true,
        updatedAt: true,

        skills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
                isActive: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!project) return null

    return {
      ...project,
      skills: project.skills.map((s) => s.skill),
    }
  },
  async updateProject({
    userId,
    projectId,
    imageUrl,
    imagePublicId,
    title,
    description,
    liveUrl,
    skills,
  }: UpdateProjectInput) {
    return prisma.$transaction(async (tx) => {
      const existingProject = await tx.project.findFirst({
        where: { id: projectId, userId },
        select: { id: true },
      })

      if (!existingProject) {
        throw new Error("Project not found or unauthorized")
      }

      await tx.project.update({
        where: { id: projectId },
        data: {
          title,
          description,
          liveUrl,

          ...(imageUrl !== null && imageUrl !== undefined && {
            imageUrl,
          }),

          ...(imagePublicId !== null && imagePublicId !== undefined && {
            imagePublicId,
          }),
        },
      })

      await tx.projectSkill.deleteMany({ where: { projectId } })

      if (skills.length > 0) {
        await tx.projectSkill.createMany({
          data: skills.map((skillId) => ({
            projectId,
            skillId,
          })),
        })
      }

      return tx.project.findUnique({
        where: { id: projectId },
        include: {
          skills: {
            include: {
              skill: { include: { category: true } },
            },
          },
        },
      })
    })
  },
  async deleteProject({ userId, projectId }: DeleteProjectInput) {
    return prisma.$transaction(async (tx) =>{
      // 1. verify ownership and get imagePublicId for cleanup
      const existingProject = await tx.project.findFirst({
        where: { id: projectId, userId },
        select: { id: true, imagePublicId: true },
      })

      if (!existingProject) {
        throw new Error("Project not found or unauthorized")
      }

      // 2. delete relations
      await tx.projectSkill.deleteMany({
        where: { projectId },
      })

      // 3. delete project
      await tx.project.delete({
        where: { id: projectId },
      })

      //return imagePublicId for cloudinary image deletion in api route
      return {
        deletedProjectId: projectId,
        imagePublicId: existingProject.imagePublicId,
      }
      
    })
  },
  async getProjectImagePublicIdsByUserId(userId: string) {
    const projects = await prisma.project.findMany({
      where: { userId },
      select: { imagePublicId: true },
    })

    return projects
      .map((p) => p.imagePublicId)
      .filter((id): id is string => Boolean(id))
  },
  async publishProfile(userId: string) {
    return prisma.profile.update({
      where: { id: userId },
      data: {
        isPublished: true,
      },
    })
  }



/*   async updatePhoneNumber({userId,phoneNumber}: {userId: string, phoneNumber: string}) {
    return prisma.profile.update({
      where: {
        id: userId,
      },
      data: {
        phoneNumber,
      },
    })
  }, */
/*   async getPhoneNumber( userId: string ) {
    const profile = await prisma.profile.findUnique({
      where: {
        id: userId,
      },
      select: {
        phoneNumber: true,
      },
    })

    return profile?.phoneNumber ?? null
  } */
 
}