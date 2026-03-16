import z from "zod";

// Category Form Schema
export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim() // trims whitespace
    .min(1, "Category name is required"),
})

export type CategoryFormInput = z.infer<typeof categoryFormSchema>