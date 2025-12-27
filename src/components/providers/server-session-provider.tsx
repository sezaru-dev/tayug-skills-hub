import { createContext, useContext, ReactNode } from "react"
import type { Session } from "next-auth"
import { toCurrentUser } from "@/lib/current-user"
import type { CurrentUser } from "@/lib/current-user"

const ServerSessionContext = createContext<Session | null>(null)

interface ServerSessionProviderProps {
  children: ReactNode
  session: Session
}

export function ServerSessionProvider({ children, session }: ServerSessionProviderProps) {
  return (
    <ServerSessionContext.Provider value={session}>
      {children}
    </ServerSessionContext.Provider>
  )
}

// Hook to get domain-friendly CurrentUser
export function useServerCurrentUser(): CurrentUser {
  const session = useContext(ServerSessionContext)
  if (!session) throw new Error("No session found")
  return toCurrentUser(session)
}
