'use client'

import React from 'react'
import ProfileHeaderView from './ProfileHeaderView'
import { ProfileType } from '@/features/service-provider.types'

type Props = {
  profile?: Pick<ProfileType, 'fullname' | 'headline' | 'barangay'>
}

const PublicProfileHeader = ({ profile }: Props) => {
  return (
    <section className="rounded-md flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
      <ProfileHeaderView profile={profile} />
    </section>
  )
}

export default PublicProfileHeader