import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { categoryFormSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { toast } from 'sonner'
import { useCreateCategory } from '../mutations/use-create-category'
import { errorToast, successToast } from '@/components/utils/custom-toast'

type AddCategoryFormProps = {
  closeDialog: () => void
}

export default function AddCategoryForm({ closeDialog }: AddCategoryFormProps) {
  const { mutate, isPending  } = useCreateCategory();

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    }
  })

  // form submit
  async function onSubmit(data: z.infer<typeof categoryFormSchema>) {
    const toastId = toast.loading("Creating category...")

    mutate(
      { name: data.name},
      {
        onSuccess: () => {
          successToast(toastId, "Category has been created..")
          closeDialog()
        },
        onError: (err) => {
          errorToast(toastId, err instanceof Error ? err.message : "Something went wrong.")
        },
      }
    );


  }
  
  return (
    <DialogContent className="sm:max-w-[425px]">

      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
        <DialogDescription>
          Add a new category to organize and classify professional skills.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <FieldGroup>
          <Controller
                name="name"
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
                      This will be shown when users browse skills.
                    </FieldDescription>
                  </Field>
                )}
              />
                        <Field>
                      <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}  className="bg-blue-600 hover:bg-blue-700">Add Category</Button>
          </DialogFooter>
          </Field>
        </FieldGroup>
        

      </form>
        </DialogContent>
  )
}
