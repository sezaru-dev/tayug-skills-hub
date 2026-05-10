export type Skill = {
  id: string
  name: string
  slug: string
  isActive: boolean
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

export type SkillViewModel = {
  id: string
  name: string
}