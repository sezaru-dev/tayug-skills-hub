import React from 'react'
import ProjectForm from '@/features/profile/components/projects/ProjectForm'

const AddProjectPage = () => {
  return (
    <main className="flex-1 p-4 md:p-8 space-y-6 mt-0 max-w-6xl mx-auto bg-white w-full">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Add a new project
          </h1>
          <p className="text-muted-foreground text-sm">
            Showcase your work by adding a project with relevant details, skills, and links.
          </p>
        </div>
      </div>

      <ProjectForm/>

    </main>
  )
}

export default AddProjectPage