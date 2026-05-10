'use client'

import React, { useState } from 'react'
import { SectionCard } from '../SectionCard'
import EditAboutForm from './EditAboutForm'
import { Skeleton } from '@/components/ui/skeleton'
import AboutSectionView from './AboutSectionView'
import { ActionButton } from '../ActionButton'
import { ProfileType } from '@/features/service-provider.types'

type Props = {
  data?: Pick<ProfileType, 'about'>
  isLoading?: boolean
}

const AboutSection = ({ data, isLoading }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const about = data?.about ?? ''

  return (
    <SectionCard
      title="About"
      action={
        !isEditing &&
        !isLoading && (
          <ActionButton
            actionType="edit"
            onClick={() => setIsEditing(true)}
          />
        )
      }
      isEditing={isEditing}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}

      {/* View mode */}
      {!isEditing && !isLoading && (
        <AboutSectionView about={about} />
      )}

      {/* Edit mode */}
      {isEditing && (
        <EditAboutForm
          currentValue={about}
          close={() => setIsEditing(false)}
        />
      )}
    </SectionCard>
  )
}

export default AboutSection