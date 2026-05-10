'use client'

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { usePatchSkillStatus } from '../../mutations/use-patch-skill-status'
import { errorToast, successToast } from '@/components/utils/custom-toast'

type ChangeStatusDialogProps = {
  id: string
  isActive: boolean
}

export function ChangeSkillStatusAlertDialog({
  id,
  isActive,
}: ChangeStatusDialogProps) {
  const {mutate, isPending, isSuccess} = usePatchSkillStatus()
  const [open, setOpen] = useState<boolean>(false)
  

  const handleDelete = async () => {
    const toastId = toast.loading(`${isActive ? "Deactivating" : "Activating"} skill...`);

    mutate(
      { id, isActive: !isActive }, // pass the desired status
      {
        onSuccess: () => {
          successToast(toastId, `Skill has been ${isActive ? "deactivated" : "activated"}.`)
          setOpen(false)
        },
        onError: (err: Error) => {
          errorToast(toastId, err instanceof Error ? err.message : "Something went wrong.")
        },
      }
    );
  }


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
        >
          Change Status
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>

        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle className={`${isActive ? "text-destructive" : ""}`}>
            {
              isActive ? "Deactivate Skill?" : "Activate Skill?"
            }
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-2">
            {
              isActive ?
              "Users will no longer see this skill in listings or features. You can reactivate it later if needed." 
              : 
              "Users will now see this skill throughout the website wherever skills are listed. You can deactivate it anytime to hide it."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer */}
        <AlertDialogFooter>
          <AlertDialogCancel
          disabled={isPending}
          >Cancel</AlertDialogCancel>

          {
            isActive ? (
              <Button
                variant="destructive"
                disabled={isPending || isSuccess}
                onClick={handleDelete}
              >
                {isPending ? "Deactivating" : "Deactivate Skill"}
              </Button>

            ) : (
              <Button
                disabled={isPending || isSuccess}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                onClick={handleDelete}
              >
                {isPending ? "Activating" : "Activate Skill"}
              </Button>

            )
          }

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}