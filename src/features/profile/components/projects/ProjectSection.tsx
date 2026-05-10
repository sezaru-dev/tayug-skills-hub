import React from 'react'
import { SectionCard } from '../SectionCard'
import ProjectCard from './ProjectCard'
import AddProjectCardButtonLink from './AddProjectCardButton'
import { Project } from '../../queries/use-get-projects-by-userid'
import { Skeleton } from '@/components/ui/skeleton'

type ProjectSectionProps = {
  data?: Project[]
  isLoading: boolean
}

const ProjectSection = ({ data, isLoading }: ProjectSectionProps) => {
  const projects = data ?? []

  return (
    <SectionCard title="Projects">
      {/* Loading state */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.length > 0 ? (
            <>
              {projects.map((project) => (
                <ProjectCard {...project} key={project.id} />
              ))}
            </>
          ) : (
            <div className="col-span-2">
              <p className="text-sm text-gray-500 italic">
                Add your sample works to showcase your expertise
              </p>
            </div>
          )}

          {/* ALWAYS show add button */}
          <AddProjectCardButtonLink
            href="/dashboard/manage-profile/projects/new"
            className="col-span-1"
          />
        </div>
      )}
    </SectionCard>
  )
}

export default ProjectSection