import { Skill } from "../skills/type"

export type Category = {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  skills: Skill[] | null
}