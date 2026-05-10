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
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { useDeleteProject } from '../../mutations/use-delete-project'

type DeleteCategoryDialogProps = {
  projectId: string
}

export function DeleteProjectAlertDialog({
  projectId
}: DeleteCategoryDialogProps) {
  const { mutate: deleteProject, isPending } = useDeleteProject()
  const [open, setOpen] = useState<boolean>(false)

  const handleDelete = async () => {

    const toastId = toast.loading("Deleting project...");

    deleteProject(
      {projectId},
      {
        onSuccess: () => {
          successToast(toastId, "Project has been deleted.")
          setOpen(false)
        },
        onError: (err:Error) => {
          errorToast(toastId, err instanceof Error ? err.message : "Something went wrong.")
          console.log(err.message)
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
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>

        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Project
          </AlertDialogTitle>

          <AlertDialogDescription asChild>       
            <p>
              This action cannot be undone. Are you sure you want to delete this project?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            Delete Skill
          </Button>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}