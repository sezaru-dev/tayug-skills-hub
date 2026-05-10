'use client'

import { useState } from 'react'
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
import { usePatchCategoryStatus } from '../../mutations/use-patch-category-status'
import { errorToast, successToast } from '@/components/utils/custom-toast'


type ChangeStatusDialogProps = {
  id: string
  isActive: boolean

}

export function ChangeCategoryStatusAlertDialog({
  id,
  isActive,
}: ChangeStatusDialogProps) {
  const {mutate, isPending, isSuccess} = usePatchCategoryStatus()
  const [open, setOpen] = useState<boolean>(false)
  

  const handleChangeStatus = async () => {
    const toastId = toast.loading(`${isActive ? "Deactivating" : "Activating"} category...`);

    mutate(
      { id, isActive: !isActive }, // pass the desired status
      {
        onSuccess: () => {
          successToast(toastId, `Category has been ${isActive ? "deactivated" : "activated"}.`)
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
              isActive ? "Deactivate Category?" : "Activate Category?"
            }
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-2">
            {
              isActive ?
              "Users will no longer see this category in listings or features. You can reactivate it later if needed." 
              : 
              "Users will now see this category throughout the website wherever categories are listed. You can deactivate it anytime to hide it."
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
                onClick={handleChangeStatus}
              >
                {isPending ? "Deactivating" : "Deactivate Skill"}
              </Button>

            ) : (
              <Button
                disabled={isPending || isSuccess}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                onClick={handleChangeStatus}
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