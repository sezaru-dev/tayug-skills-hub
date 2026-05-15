'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import ProjectPreviewModal from './ProjectPreviewModal'
import { PublicProject } from './PublicProjectSection'



const PublicProjectCard = ({
  title,
  imageUrl,
  description,
  skills,
  liveUrl,
}: PublicProject) => {
  const [open, setOpen] = useState(false)

  return (
    <article className="border rounded-xl overflow-hidden bg-white">
      
      {/* Image */}
      <div className="h-40 bg-gray-200 relative group">
        
        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-200">
          
          <Button type="button" onClick={() => setOpen(true)}>
            Preview
          </Button>

          {liveUrl && (
            <Button asChild variant="secondary">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Visit
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}

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

      {/* Modal */}
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

export default PublicProjectCard