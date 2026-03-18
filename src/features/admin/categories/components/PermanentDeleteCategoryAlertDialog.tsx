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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDeleteCategory } from '../mutations/use-delete-category'
import { toast } from 'sonner'

type DeleteCategoryDialogProps = {
  id: string
  categoryName: string

}

export function PermanentDeleteCategoryAlertDialog({
  id,
  categoryName,
}: DeleteCategoryDialogProps) {
  const { mutate, isPending  } = useDeleteCategory();
  const [open, setOpen] = useState<boolean>(false)
  const [confirmText, setConfirmText] = useState<string>('')
  
  const isMatch = confirmText === categoryName

  const handleDelete = async () => {
    if (!isMatch) return
    const toastId = toast.loading("Deleting category...");

    mutate(
      { id, confirmText},
      {
        onSuccess: () => {
          toast.success("Category has been deleted.", { id: toastId });
          setOpen(false)
        },
        onError: (err) => {
          toast.error(
            err instanceof Error ? err.message : "Something went wrong.",
            { id: toastId }
          );
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
            Delete Category
          </AlertDialogTitle>

          <AlertDialogDescription asChild>
            <div className="space-y-2">              
              <p>
                This action cannot be undone. Deleting this category may affect associated listings.
              </p>

              <p className="text-sm">
                To confirm, type{' '}
                <strong className="text-foreground">
                  {categoryName}
                </strong>{' '}
                below.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          placeholder={categoryName}
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />

        {/* Footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            variant="destructive"
            disabled={!isMatch || isPending}
            onClick={handleDelete}
          >
            Delete Category
          </Button>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}