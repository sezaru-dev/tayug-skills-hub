'use client'

import React, { useState } from 'react'
import { SectionCard } from '../SectionCard'

import EditContactForm from './EditContactForm'
import { Skeleton } from '@/components/ui/skeleton'
import ContactSectionView from './ContactSectionView'
import { ActionButton } from '../ActionButton'

type Props = {
  phoneNumber?: string
  isLoading?: boolean
}

const ContactSection = ({ phoneNumber, isLoading }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const loading = isLoading

  return (
    <SectionCard
      title="Contact"
      action={
        !isEditing &&
        !loading && (
          <ActionButton
            actionType="edit"
            onClick={() => setIsEditing(true)}
          />
        )
      }
      isEditing={isEditing}
    >
      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-48" />
        </div>
      )}

      {/* View mode */}
      {!isEditing && !loading && (
        <ContactSectionView phoneNumber={phoneNumber} />
      )}

      {/* Edit mode */}
      {isEditing && !loading && (
        <EditContactForm
          currentValue={phoneNumber ?? null}
          close={() => setIsEditing(false)}
        />
      )}
    </SectionCard>
  )
}

export default ContactSection