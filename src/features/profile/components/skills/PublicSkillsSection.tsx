'use client'

import React from 'react'
import { SectionCard } from '../SectionCard'
import SkillsSectionView from './SkillsSectionView'
import { SkillViewModel } from '../../types'


type Props = {
  data: {
    id: string
    name: string
  }[]
}

const PublicSkillsSection = ({ data }: Props) => {
  const safeSkills = Array.isArray(data) ? data : []

  const viewSkills: SkillViewModel[] = safeSkills.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }))

  return (
    <SectionCard title="Skills">
      <SkillsSectionView skills={viewSkills} />
    </SectionCard>
  )
}

export default PublicSkillsSection