import z, { file } from "zod";
import { BARANGAYS } from "./constant";

export const MAXBIOLENGTH = 600;
export const MAXHEADLINELENGTH = 120;
export const MAXDESCRIPTIONLENGTH = 300;


export const EditAboutFormSchema = z.object({
  about: z
    .string()
    .nonempty({ message: "About is required." })
    .max(MAXBIOLENGTH, { message: `About cannot exceed ${MAXBIOLENGTH} characters.` }),
  })
export const EditSkillsFormSchema = z.object({
  skills: z.array(z.string()).min(1, { message: "Select at least one skill." }),
  })
export const HeaderFormSchema = z.object({
  fullname: z.string().min(4, { message: "Name must be at least 10 characters." }),
  headline: z.string().max(MAXHEADLINELENGTH, { message: `Headline cannot exceed ${MAXHEADLINELENGTH} characters.`}).optional(),
  barangay: z.enum(BARANGAYS, {message: "Please select a valid barangay"}).nullable(),
})

export const ProjectFormSchema = z.object({
  imageFile: z
  .instanceof(File, { message: "Please upload a project image." })
  .refine((file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]

    const maxSizeInMB = 3
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024

    return (
      allowedTypes.includes(file.type) &&
      file.size <= maxSizeInBytes
    )
  }, {
    message: "Image must be JPG, PNG, or WEBP and under 3MB.",
  }),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required." }),

  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required." })
    .max(MAXDESCRIPTIONLENGTH, {
      message: `Description cannot exceed ${MAXDESCRIPTIONLENGTH} characters.`,
    }),

  skills: z
    .array(z.string())
    .min(1, { message: "Select at least 1 skill." })
    .max(10, { message: "You can add up to 10 skills." }),

  liveUrl: z
    .string()
    .trim()
    .url({ message: "Live URL must be a valid URL." })
    .or(z.literal(""))
    .optional(),
})
export const EditProjectFormSchema = z.object({
imageFile: z
  .instanceof(File)
  .optional()
  .refine((file) => {
    if (!file) return true

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    const maxSizeInBytes = 3 * 1024 * 1024

    return (
      allowedTypes.includes(file.type) &&
      file.size <= maxSizeInBytes
    )
  }, {
    message: "Image must be JPG, PNG, or WEBP and under 3MB.",
  }),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required." }),

  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required." })
    .max(MAXDESCRIPTIONLENGTH, {
      message: `Description cannot exceed ${MAXDESCRIPTIONLENGTH} characters.`,
    }),

  skills: z
    .array(z.string())
    .min(1, { message: "Select at least 1 skill." })
    .max(10, { message: "You can add up to 10 skills." }),

  liveUrl: z
    .string()
    .trim()
    .url({ message: "Live URL must be a valid URL." })
    .or(z.literal(""))
    .optional(),
})

export const EditContactFormSchema = z.object({
  phoneNumber:z
    .string()
    .regex(/^\d+$/, 'Phone number must contain only numbers')
    .length(11, 'Phone number must be exactly 11 digits')
    .startsWith('09', 'Phone number must start with 09')
  }
)

export const CreateProjectSchema = z.object({
  imageUrl: z.string().url(),
  imagePublicId: z.string(),
  title: z.string().min(1),
  description: z.string().min(1).max(MAXDESCRIPTIONLENGTH),
  liveUrl: z.string().url().optional().or(z.literal("")),
  skills: z.array(z.string()).min(1).max(10),
})

export const EditProjectSchema = z.object({
  projectId: z.string().min(1),

  imageUrl: z.string().url().nullable().optional(),
  imagePublicId: z.string().nullable().optional(),

  title: z.string().min(1),
  description: z.string().min(1).max(MAXDESCRIPTIONLENGTH),

  liveUrl: z.string().url().optional().or(z.literal("")),

  skills: z.array(z.string()).min(1).max(10),
})


  export type HeaderFormInput = z.infer<typeof HeaderFormSchema>
  export type EditAboutFormInput = z.infer<typeof EditAboutFormSchema>
  export type EditSkillsFormInput = z.infer<typeof EditSkillsFormSchema>
  export type ProjectFormInput = z.infer<typeof ProjectFormSchema>
  export type EditProjectFormInput = z.infer<typeof EditProjectFormSchema>
  export type EditContactFormInput = z.infer<typeof EditContactFormSchema>