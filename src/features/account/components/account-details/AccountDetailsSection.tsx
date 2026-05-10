
import React from 'react'
import EditableForm from './EditableForm'
import { unstable_noStore as noStore } from "next/cache"
import { useGetProfileById } from '@/features/profile/queries/use-get-profile-by-id'
import { ProfileRepository } from '@/features/profile/profile-repository'
import { Role } from '@/types/roles'
import { ProfileType } from '@/features/service-provider.types'

type Props ={
  id: string
}

const AccountDetailsSection = async ({id}:Props) => {
  noStore()
  const profile = await ProfileRepository.getProfileById(id) as ProfileType

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Profile</h2>


        <EditableForm profile={profile}/>      


  </section>
  )
}

export default AccountDetailsSection