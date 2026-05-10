import React from 'react'
import ProjectCard from './ProjectCard'
import { Project } from '../../queries/use-get-projects-by-userid'

type Props = {
  projects: Project[]
}

const ProjectsSectionView = ({ projects }: Props) => {
  const safeProjects = Array.isArray(projects) ? projects : []

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {safeProjects.length > 0 ? (
        safeProjects.map((project) => (
          <ProjectCard {...project} key={project.id} />
        ))
      ) : (
        <div className="col-span-2">
          <p className="text-sm text-gray-500 italic">
            No projects added yet
          </p>
        </div>
      )}
    </div>
  )
}

export default ProjectsSectionView