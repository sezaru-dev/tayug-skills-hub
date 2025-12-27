'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"


type NextAuthProviderProps = {
  children: React.ReactNode
  session: Session | null
}

function NextAuthProvider({children, session}:NextAuthProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default NextAuthProvider