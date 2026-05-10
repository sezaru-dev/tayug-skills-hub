import z from "zod";
import { BARANGAYS } from "../profile/constant";

export const AccountProfileSchema = z.object({
  fullname: z.string().min(4, { message: "Name must be at least 10 characters." }),
  barangay: z.enum(BARANGAYS, {message: "Please select a valid barangay"}).nullable(),
})

export const ChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required"),

  newPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      {
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      }
    ),

  confirmNewPassword: z
    .string()
    .min(1, "Please confirm your password"),
  })
  // 1. confirm password match
  .refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    }
  )
  // 2. prevent same as current password
  .refine(
    (data) => data.newPassword !== data.currentPassword,
    {
      message: "New password must be different from current password",
      path: ["newPassword"],
    }
);

export const DeleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required"),
  confirmed: z.boolean().refine((val) => val === true, {
    message: "You must confirm before deleting your account",
  }),
})
export const DeleteAccountRouteSchema = z.object({
  password: z.string().min(1, "Password is required"),
})

export const AdminAccountDetailsSchema = z.object({
  name: z.string().min(8, { message: "Name must be at least 8 characters." }),
  email: z.string().email({message: "Please enter a valid email address.",}),
})

export type AdminAccountDetailsInput = z.infer<typeof AdminAccountDetailsSchema>
export type AccountProfileInput = z.infer<typeof AccountProfileSchema>
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type DeleteAccountInput = z.infer<typeof DeleteAccountSchema>;