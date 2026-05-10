'use client'
import React, {useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import ChangeCategoryForm from './ChangeCategoryForm'

type ChangeCategoryProps = {
  id: string
  name: string
  currentCategoryId: string
}

const ChangeCategoryDialog = ({ id, name , currentCategoryId }: ChangeCategoryProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault()
          setOpen(true)
        }}>
          Change Category
        </DropdownMenuItem>
      </DialogTrigger>
      {
        open && (
          <DialogContent className="sm:max-w-[425px]">
      
            <DialogHeader>
              <DialogTitle>Change Category</DialogTitle>
            </DialogHeader>

            {/* form */}
            <ChangeCategoryForm
              closeDialog={() => {
                setOpen(false)
              }}
              id={id}
              name={name}
              currentCategoryId={currentCategoryId}
            />
            
          </DialogContent>
        )
      }
    </Dialog>
  )
}

export default ChangeCategoryDialog