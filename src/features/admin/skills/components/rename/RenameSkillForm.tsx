import React from 'react'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { RenameSkillFormInput, RenameSkillFormSchema } from '../../schema'
import { usePatchSkillName } from '../../mutations/use-patch-skill-name'
import { errorToast, successToast } from '@/components/utils/custom-toast'

type RenameSkillFormProps = {
  id: string
  currentName: string
  categoryId: string
  closeDialog: () => void
}

const RenameSkillForm = ({ id, currentName, categoryId, closeDialog }: RenameSkillFormProps) => {
  const {mutate, isPending} = usePatchSkillName();

  const form = useForm<RenameSkillFormInput>({
    resolver: zodResolver(RenameSkillFormSchema),
    defaultValues: {
      name: currentName || "",
      categoryId
    }
  })

  const watchedName = form.watch("name");

  async function onSubmit(data: RenameSkillFormInput) {
    const toastId = toast.loading("Renaming skill...");

    mutate(
      { id, name: data.name, categoryId },
      {
        onSuccess: () => {
          successToast(toastId, "Skill name has been renamed.")
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
          name='name'
          control={form.control}
          render={({field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-input-category-name">
                Skill Name
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
                This change will update the skill name everywhere it appears.
              </FieldDescription>
            </Field>
          )}

        />
        <Button type="submit" disabled={isPending || watchedName === currentName}  className="bg-blue-600 hover:bg-blue-700">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>

      </FieldGroup>

        </form>
  )
}

export default RenameSkillForm