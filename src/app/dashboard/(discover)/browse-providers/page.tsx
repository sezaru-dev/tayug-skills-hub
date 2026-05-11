import BrowseProviderSection from "@/features/provider-discovery/components/BrowseProviderSection"
import { verifySession } from "@/lib/verify-session"
import { Role } from "@/types/roles"
import { NextResponse } from "next/server"

const BrowsePage = async () => {
    const session = await verifySession([Role.PROVIDER])
  
    if (session instanceof NextResponse) {
      return session
    }
    
    const userId = session.user.id
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Browse Service Provider</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Explore available service providers, view their profiles, and connect
          with the right skills for your needs.
        </p>
      </header>
      <BrowseProviderSection userId={userId}/>
    </main>
  )
}
export default BrowsePage