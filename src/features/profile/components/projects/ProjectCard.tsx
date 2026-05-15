'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import MenuButton from './MenuButton'
import Image from 'next/image'
import ProjectPreviewModal from './ProjectPreviewModal'

type ProjectCardProps = {
  id: string
  title: string
  imageUrl: string | null
  description: string | null
  skills: {
    id: string
    name: string
  }[]
}

const ProjectCard = ({
  id,
  title,
  imageUrl,
  description,
  skills,
}: ProjectCardProps) => {
  const [open, setOpen] = useState(false)
  return (
    <article className="border rounded-xl overflow-hidden bg-white relative">
      {/* Options button */}
      <MenuButton id={id}/>

      {/* Image */}
      <div className="h-40 bg-gray-200 relative group">
        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 bg-gray-800/70 opacity-0 group-hover:opacity-100 grid place-items-center transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
          <Button type="button" onClick={() => setOpen(true)}>
            Preview
          </Button>
        </div>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm sm:text-base">{title}</h3>

        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="text-[10px] sm:text-xs px-2 py-0.5 bg-gray-100 rounded-md"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
      <ProjectPreviewModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        imageUrl={imageUrl}
        description={description}
        skills={skills}
      />
    </article>
  )
}

export default ProjectCard