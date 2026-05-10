import { BARANGAYS } from "./profile/constant"

export type Barangay = (typeof BARANGAYS)[number]
export type ProfileHeader = {
  fullname: string
  headline: string
  barangay: Barangay
}
export type ProfileHeaderProps = ProfileHeader & {
  id: string
}

export type UpdateProfileHeaderInput = {
  fullname: string
  headline?: string
  barangay: Barangay | null // UI allows null
}

export type ProfileType = {
  id: string
  fullname: string
  headline?: string
  barangay: Barangay | null
  about: string
  phoneNumber: string
  telNumber: string | null
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

