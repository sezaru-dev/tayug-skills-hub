import LoadingSkeleton from "@/components/custom/LoadingSkeleton"
import AccountDetailsSection from "@/features/account/components/account-details/AccountDetailsSection"
import ChangePasswordSection from "@/features/account/components/change-password/ChangePasswordSection"
import { DeleteAccountSection } from "@/features/account/components/delete-account/DeleteAccountSection"
import { verifySession } from "@/lib/verify-session"
import { Role } from "@/types/roles"
import { NextResponse } from "next/server"
import { Suspense } from "react"

export default async function AccountSettingsPage() {
  const session = await verifySession([Role.PROVIDER])
  
  if (session instanceof NextResponse) {
    return session
  }
  
  const id = session.user.id
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 w-full max-w-2xl mx-auto">

      {/* header */}
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Update account details, change password, and account deletion.
        </p>
      </header>

      {/* Profile */}
      <Suspense fallback={<LoadingSkeleton />}>
        <AccountDetailsSection id={id}/>
      </Suspense>

      <ChangePasswordSection/>
      <DeleteAccountSection/>         

    </main>
  )
}
