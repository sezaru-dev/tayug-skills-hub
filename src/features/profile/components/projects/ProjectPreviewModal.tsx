'use client'

import React from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  imageUrl: string | null
  description: string | null
  skills: {
    id: string
    name: string
  }[]
}

const ProjectPreviewModal = ({
  open,
  onClose,
  title,
  imageUrl,
  description,
  skills,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2 h-[85vh]">
          
          {/* Image */}
          <div className="relative bg-black">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {title}
              </DialogTitle>
            </DialogHeader>

            {description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectPreviewModal