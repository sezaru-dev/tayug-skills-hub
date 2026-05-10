'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddSkillForm from './AddSkillForm'

export const AddSkillDialog = () => {
    const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Add New Skill</Button>
      </DialogTrigger>
      {
        open && (
          <DialogContent className="sm:max-w-[425px]">
      
            <DialogHeader>
              <DialogTitle>Add Skill</DialogTitle>
              <DialogDescription>
                Add a new skill and categorize it to keep skills organized.
              </DialogDescription>
            </DialogHeader>

            {/* form */}
            <AddSkillForm
              closeDialog={() => setOpen(false)}
            />
            
            </DialogContent>
        )
      }
    </Dialog>
  )
}
