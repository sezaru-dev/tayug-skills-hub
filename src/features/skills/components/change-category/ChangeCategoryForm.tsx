import React from 'react'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { ChangeCategoryFormInput, ChangeCategoryFormSchema } from '../../schema'
import SelectCategory from '../SelectCategory'
import { usePatchSkillCategory } from '../../mutations/use-patch-skill-category'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { toast } from 'sonner'

type ChangeCategoryFormProps = {
  id: string
  name: string
  currentCategoryId: string
  closeDialog: () => void
}

const ChangeCategoryForm = ({ id, name, currentCategoryId, closeDialog }: ChangeCategoryFormProps) => {
  const {mutate, isPending} = usePatchSkillCategory();

  const form = useForm<ChangeCategoryFormInput>({
    resolver: zodResolver(ChangeCategoryFormSchema),
    defaultValues: {
      name: name || "",
      categoryId: currentCategoryId || "",
    }
  })

  const watchCategoryId = form.watch("categoryId");

  async function onSubmit(data: ChangeCategoryFormInput) {

    const toastId = toast.loading("Updating Category...");

    mutate(
      {id, name: data.name, categoryId: data.categoryId },
      {
        onSuccess: () => {
          successToast(toastId, "Skill category has been updated.")
          closeDialog();
        },
        onError: (err) => {
          errorToast(toastId, err instanceof Error ? err.message : "Something went wrong.")
        },
      }
    );
  }


  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='grid gap-4'
    >
      <FieldGroup>
        <Controller
          name="categoryId"
          control={form.control}
          render={({field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-input-skill-category">
                Select Category
              </FieldLabel>
              <SelectCategory onChange={field.onChange} value={field.value} />
              {fieldState.invalid && (
                <small>
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-xs text-red-600 mt-1"
                  />
                </small>
              )}
              <FieldDescription className='text-xs'>
                This will move the skill to a different category and update it everywhere it is used.
              </FieldDescription>
            </Field>
          )}
        />

        <Button type="submit" disabled={isPending || watchCategoryId === currentCategoryId}  className="bg-blue-600 hover:bg-blue-700">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>

      </FieldGroup>

      
    </form>
  )
}

export default ChangeCategoryForm