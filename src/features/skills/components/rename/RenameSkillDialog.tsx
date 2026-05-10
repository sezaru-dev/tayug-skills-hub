import React, {useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import RenameSkillForm from './RenameSkillForm'

type RenameSkillDialogProps = {
  id: string
  currentName: string
  categoryId: string
}

const RenameSkillDialog = ({ id, currentName, categoryId }: RenameSkillDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault()
          setOpen(true)
        }}>
          Rename
        </DropdownMenuItem>
      </DialogTrigger>
      {
        open && (
          <DialogContent className="sm:max-w-[425px]">
      
            <DialogHeader>
              <DialogTitle>Rename Skill</DialogTitle>
            </DialogHeader>

            {/* form */}
            <RenameSkillForm
              closeDialog={() => {
                setOpen(false)
              }}
              id={id}
              currentName={currentName}
              categoryId={categoryId}
            />
            
          </DialogContent>
        )
      }
    </Dialog>
  )
}

export default RenameSkillDialog