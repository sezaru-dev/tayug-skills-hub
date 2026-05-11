import SavedProvidersList from "@/features/saved-provider/components/SavedProviderList"
import { SavedProvidersListSkeleton } from "@/features/saved-provider/components/SavedProvidersListSkeleton"
import { verifySession } from "@/lib/verify-session"
import { Role } from "@/types/roles"
import { NextResponse } from "next/server"
import { Suspense } from "react"

export default async function Page() {
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) {
    return session
  }
  
  const userId = session.user.id

  
  return (
    <main className="flex-1 p-6 md:p-8 space-y-2 md:space-y-3">
      <header className="mb-10 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
          List of bookmarked providers
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl leading-relaxed">
          Access the service providers you’ve saved for quick reference and easy connection.
        </p>
      </header>

      <Suspense fallback={<SavedProvidersListSkeleton />}>
        <SavedProvidersList userId={userId} />
      </Suspense>


      
    </main>
  )
}
