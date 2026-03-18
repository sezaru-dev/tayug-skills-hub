'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Skill } from "../../skills/type"
import { Badge } from '@/components/ui/badge'

type ViewSkillsProps = {
  category: string
  skills: Skill[] | null
}

export default function ViewSkillsDialog({ category, skills }: ViewSkillsProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault()
          setOpen(true)
        }}>
          View Skills
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Skills under this category</DialogTitle>
          <DialogDescription className='font-semibold'>{category}</DialogDescription>
        </DialogHeader>

          {!skills?.length ? (
            <p className="text-gray-500">No skills found for this category.</p>
          ) : (
            <ul className="max-h-64 overflow-y-auto space-y-1">
              {skills.map((skill, index) => (
                <li
                  key={skill.id}
                  className="flex items-center justify-between "
                >
                  <span>
                    {index + 1}. {skill.name}
                  </span>
                  {
                    skill.isActive ? (
                      <Badge
                        variant="secondary"
                        className="text-blue-600 font-medium"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="text-muted-foreground"
                      >
                        Inactive
                      </Badge>
                    )
                  }
                </li>
              ))}
            </ul>
          )}
      </DialogContent>

    </Dialog>
  )
}
