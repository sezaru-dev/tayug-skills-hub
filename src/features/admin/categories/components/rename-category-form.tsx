'use client'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { categoryFormSchema } from '../schema'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { usePatchCategoryName } from '../mutations/use-patch-category-name'

type RenameCategoryFormProps = {
  id: string
  currentName: string
  onSuccess: () => void
}

export default function RenameCategoryForm({ id, currentName, onSuccess }: RenameCategoryFormProps) {
  const { mutate, isPending  } = usePatchCategoryName();

    const form = useForm<z.infer<typeof categoryFormSchema>>({
      resolver: zodResolver(categoryFormSchema),
      defaultValues: {
        name: currentName || "",
      }
    })
    const watchedName = form.watch("name");

    async function onSubmit(data: z.infer<typeof categoryFormSchema>) {
      const toastId = toast.loading("Renaming category...");

      mutate(
        { id, name: data.name },
        {
          onSuccess: () => {
            toast.success("Category name has been renamed.", { id: toastId });
            onSuccess();
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
    <>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className="truncate">Update Category Name</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-4'
        >
          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              render={({field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-input-category-name">
                    Category Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-input-category-name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={isPending}
                      onBlur={(e) => {
                      const trimmed = e.target.value.trim()
                      field.onChange(trimmed)
                      field.onBlur()
                }}
                  />
                  {fieldState.invalid && (
                    <small>
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-red-600 mt-1"
                      />
                    </small>
                  )}
                  <FieldDescription className='text-xs'>
                    The new name will appear everywhere this category is used.
                  </FieldDescription>
                </Field>
              )}

            />
            <Button type="submit" disabled={isPending || watchedName === currentName}  className="bg-blue-600 hover:bg-blue-700">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>

          </FieldGroup>

          
        </form>
      </DialogContent>
    </>
  )
}
