'use client'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import RenameCategoryForm from './RenameCategoryForm'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type RenameCategoryDialogProps = {
  children?: React.ReactNode
  id: string
  currentName: string
}

export default function RenameCategoryDialog({children, id, currentName}: RenameCategoryDialogProps) {
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

      
        <RenameCategoryForm
          onSuccess={() => {
            setOpen(false)
          }}
          id={id}
          currentName={currentName}
        />
      

    </Dialog>
  )
}
