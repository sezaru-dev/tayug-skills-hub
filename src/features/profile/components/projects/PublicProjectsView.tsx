import React from 'react'
import PublicProjectCard from './PublicProjectCard'
import { PublicProject } from './PublicProjectSection'

type Props = {
  projects: PublicProject[]
}

const PublicProjectsView = ({ projects }: Props) => {
  const safeProjects = Array.isArray(projects) ? projects : []

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {safeProjects.length > 0 ? (
        safeProjects.map((project) => (
          <PublicProjectCard {...project} key={project.id} />
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

export default PublicProjectsView