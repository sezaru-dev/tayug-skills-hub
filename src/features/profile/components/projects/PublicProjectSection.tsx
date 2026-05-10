import React from 'react'
import { SectionCard } from '../SectionCard'
import { Project } from '../../queries/use-get-projects-by-userid'
import ProjectsSectionView from './ProjectsSectionView'
import PublicProjectsView from './PublicProjectsView'

export type PublicSkill = {
  id: string
  name: string
}

export type PublicProject = {
  id: string
  title: string
  description: string | null
  liveUrl: string | null
  imageUrl: string | null
  skills: PublicSkill[]
}


type Props = {
  data?: PublicProject[]
}

const PublicProjectSection = ({ data }: Props) => {
  const projects = data ?? []

  return (
    <SectionCard title="Projects">
      <PublicProjectsView projects={projects} />
    </SectionCard>
  )
}

export default PublicProjectSection