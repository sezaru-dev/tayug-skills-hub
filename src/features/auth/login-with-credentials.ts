import { verifyPassword } from "@/lib/auth-bcryptjs"
import { UserRepository } from "@/server/repositories/user.repository"
import { Role } from "@/types/roles"

export async function loginWithCredentials(email: string, password: string) {
  const user = await UserRepository.findByEmail(email)
  if (!user) throw new Error("Invalid credentials")

  const isValid = await verifyPassword(password, user.password!)
  if (!isValid) throw new Error("Invalid credentials")

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
  }
}
