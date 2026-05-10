'use client'

import React, { useState } from 'react'
import { SectionCard } from '../SectionCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetActiveSkills } from '@/features/skills/queries/use-get-active-skills'
import EditButton from './EditButton'
import EditSkillSForm from './EditSkillsForm'
import { SkillWithCategory } from './EditSkillsDialog'
import SkillsSectionView from './SkillsSectionView'

type SkillSectionProps = {
  data: SkillWithCategory[]
  isUserSkillsLoading: boolean
}

const SkillsSection = ({ data, isUserSkillsLoading }: SkillSectionProps) => {
  const [isEditMode, setIsEditMode] = useState(false)

  const {
    data: skills = [],
    isLoading: isSkillsLoading,
  } = useGetActiveSkills()

  const isLoading = isSkillsLoading || isUserSkillsLoading

  const safeUserSkills = Array.isArray(data) ? data : []

  const currentValue = safeUserSkills.map(
    (skill: SkillWithCategory) => skill.id
  )

  return (
    <SectionCard
      title="Skills"
      action={
        !isEditMode && !isLoading && (
          <EditButton
            isEditMode={isEditMode}
            onClick={() => setIsEditMode(true)}
          />
        )
      }
      isEditing={isEditMode}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-md" />
          ))}
        </div>
      )}

      {/* Edit mode */}
      {isEditMode && !isLoading && (
        <EditSkillSForm
          skillsOption={skills}
          currentValue={currentValue}
          closeEditMode={() => setIsEditMode(false)}
        />
      )}

      {/* View mode */}
      {!isEditMode && !isLoading && (
        <SkillsSectionView skills={safeUserSkills} />
      )}
    </SectionCard>
  )
}

export default SkillsSection