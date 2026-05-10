'use client'

import React from 'react'
import { ProfileType } from '@/features/service-provider.types'


type Props = {
  profile?: Pick<ProfileType, 'fullname' | 'headline' | 'barangay'>
}

const ProfileHeaderView = ({ profile }: Props) => {
  const fullname = profile?.fullname ?? ''
  const headline = profile?.headline ?? ''
  const barangay = profile?.barangay ?? null

  const initials = fullname
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <>
      <div className="h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 grid place-items-center bg-muted rounded-full border-2 border-white overflow-hidden shrink-0 mx-auto sm:mx-0">
        <p className="text-4xl text-muted-foreground font-semibold">
          {initials}
        </p>
      </div>

      <div className="space-y-2 text-center sm:text-left">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          Service Provider Profile
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
          {fullname}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          {headline}
        </p>

        <p className="text-xs sm:text-sm text-muted-foreground">
          {barangay}
        </p>
      </div>
    </>
  )
}

export default ProfileHeaderView