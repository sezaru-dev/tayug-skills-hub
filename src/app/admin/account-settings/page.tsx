export const dynamic = "force-dynamic"
import React from 'react'
import AccountInfoForm from '@/features/account/components/AccountInfoForm'
import ChangePasswordForm from '@/features/account/components/ChangePasswordForm'
import { Role } from '@/types/roles'
import { AccountRepository } from '@/features/account/account.repository'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminAccountSettingPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/")
  }
  
  const id = session.user.id

  const accountInfo = await AccountRepository.getAccountInfoById(id)
    if (!accountInfo) {
    return <div>Account not found</div>
}
  console.log('Account info', accountInfo);
    
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 w-full max-w-3xl mx-auto">

      {/* header */}
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Update account details, change password, and account deletion.
        </p>
      </header>

      <section className='border rounded-md'>
        <AccountInfoForm data={accountInfo}/>
      </section>
      <section className='border rounded-md'>
        <ChangePasswordForm/>  
      </section>

    </main>
  )
}