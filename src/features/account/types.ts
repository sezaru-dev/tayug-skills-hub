import { Role } from "@/types/roles"

export type AccountType = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: Role
  provider: string
}

export type AdminAccountInfoFormType = Pick<AccountType, "name" | "email">

export type DeleteAccountInput = {
  password: string
}

export type DeleteAccountResponse = {
  success: boolean
  deletedUserId: string
}