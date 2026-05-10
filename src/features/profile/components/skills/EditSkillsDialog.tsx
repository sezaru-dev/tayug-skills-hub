'use client'
import React, {useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import EditSkillsForm from './EditSkillsForm'

export type SkillWithCategory = {
  id: string
  name: string
  isActive: boolean
  category: {
    id: string
    name: string
    isActive: boolean
  }
}

export type EditSkillsDialogProps = {
  skillsOption: SkillWithCategory[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const skillGroups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue", "Svelte"],
  },
  {
    label: "Styling",
    items: ["Tailwind CSS", "SCSS", "CSS Modules"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "PostgreSQL"],
  },
]

const EditSkillsDialog = ({skillsOption, open, onOpenChange}: EditSkillsDialogProps) => {
  /* const [open, setOpen] = useState<boolean>(false) */


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            s
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
      {
        open && (
          <DialogContent className="sm:max-w-lg"
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
      
            <DialogHeader>
              <DialogTitle>Edit Skills</DialogTitle>
              <DialogDescription>
                Add or update your professional skills to showcase your expertise and attract potential clients or employers.
              </DialogDescription>
            </DialogHeader>

            {/* form */}
{/*             <EditSkillsForm
              skillsOption={skillsOption}
              currentValue={[]}
              closeDialog={() => {
                onOpenChange(false)
              }}
            /> */}

          </DialogContent>
        )
      }
    </Dialog>
  )
}

export default EditSkillsDialog