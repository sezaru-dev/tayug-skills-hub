'use client'

import React, { useState } from 'react'
import { ActionButton } from '../ActionButton'
import EditHeaderForm from './EditHeaderForm'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import ProfileHeaderView from './ProfileHeaderView'
import { ProfileType } from '@/features/service-provider.types'

type Props = {
  profile?: Pick<ProfileType, 'fullname' | 'headline' | 'barangay'>
  isLoading?: boolean
}

const ProfileHeader = ({ profile, isLoading }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const fullname = profile?.fullname ?? ''
  const headline = profile?.headline ?? ''
  const barangay = profile?.barangay ?? null

  const isViewMode = !isEditing

  return (
    <section
      className={cn(
        "p-4 rounded-md flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 relative transition-all",
        isEditing
          ? "border bg-background shadow-sm"
          : "border border-transparent bg-muted/20"
      )}
    >
      {/* Edit button */}
      {isViewMode && !isLoading && (
        <ActionButton
          className="absolute top-[5%] right-2 z-10"
          actionType="edit"
          onClick={() => setIsEditing(true)}
        />
      )}

      {/* View mode */}
      {isViewMode && !isLoading && (
        <ProfileHeaderView profile={profile} />
      )}

      {/* Loading (optional, unchanged behavior) */}
      {isLoading && (
        <div className="flex gap-4 items-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      )}

      {/* Edit mode */}
      {isEditing && (
        <EditHeaderForm
          currentValue={{
            fullname,
            headline,
            barangay,
          }}
          close={() => setIsEditing(false)}
        />
      )}
    </section>
  )
}

export default ProfileHeader