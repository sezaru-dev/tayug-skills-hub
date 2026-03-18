'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddCategoryForm from "./AddCategoryForm"

export function AddCategory() {
  const [open, setOpen] = useState<boolean>(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">Add New Category</Button>
        </DialogTrigger>
        
        {/* Form */}
        {
          open && (
            <AddCategoryForm closeDialog={() => setOpen(false)}/>
          )
        }
      </form>
    </Dialog>
  )
}