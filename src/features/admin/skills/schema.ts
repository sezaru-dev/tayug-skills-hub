import z from "zod";

// Category Form Schema
export const AddSkillFormSchema = z.object({
  name: z
    .string()
    .trim() // trims whitespace
    .min(1, "Skill name is required"),
  categoryId: z.string().min(1, "Category is required"),
})

export const RenameSkillFormSchema = z.object({
  name: z
    .string()
    .trim() // trims whitespace
    .min(1, "Skill name is required"),
  categoryId: z
    .string()
    .trim() // trims whitespace
    .min(1, "CategoryId is required"),
  })
export const ChangeCategoryFormSchema = z.object({
  name: z
    .string()
    .trim() // trims whitespace
    .min(1, "Skill name is required"),
  categoryId: z.string().min(1, "Category is required"),
})

export type AddSkillFormInput = z.infer<typeof AddSkillFormSchema>
export type RenameSkillFormInput = z.infer<typeof RenameSkillFormSchema>
export type ChangeCategoryFormInput = z.infer<typeof ChangeCategoryFormSchema>