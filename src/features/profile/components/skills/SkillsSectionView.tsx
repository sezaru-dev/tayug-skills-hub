'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { SkillViewModel } from '../../types'

type Props = {
  skills: SkillViewModel[]
}

const SkillsSectionView = ({ skills }: Props) => {
  const safeSkills = Array.isArray(skills) ? skills : []

  return (
    <ul className="flex flex-wrap gap-2">
      {safeSkills.length > 0 ? (
        safeSkills.map((skill) => (
          <li key={skill.id}>
            <Badge
              variant="outline"
              className="px-2.5 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium bg-muted/80 border-0"
            >
              {skill.name}
            </Badge>
          </li>
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">
          No skills added yet.
        </p>
      )}
    </ul>
  )
}

export default SkillsSectionView