import React from 'react'
import { SkillWithCategory } from './EditSkillsDialog'
import Combobox from './Combobox'
import {
  Field,
  FieldError,
  FieldGroup,
} from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { EditSkillsFormInput, EditSkillsFormSchema } from '../../schema'
import { useUpdateUserSkills } from '../../mutations/use-update-user-skills'
import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'


type EditSkillsFormProps = {
  skillsOption: SkillWithCategory[]
  currentValue: string[] | undefined
  closeEditMode: () => void
}

const EditSkillSForm = ({ skillsOption, currentValue, closeEditMode}: EditSkillsFormProps) => {
  const {mutate, isPending} = useUpdateUserSkills()
  

  /* console.table(skillsOption) */
  

  
    const form = useForm<EditSkillsFormInput>({
      resolver: zodResolver(EditSkillsFormSchema),
      defaultValues: {
        skills: currentValue || [],
      }
    })
  
  
    async function onSubmit(data: EditSkillsFormInput) {
          const {skills} = data
    const toastId = toast.loading("Updating profile header...");

    mutate(
      { skills },
      {
        onSuccess: () => {
          successToast(toastId, "Changes saved successfully.")
          closeEditMode()
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
          name='skills'
          control={form.control}
          render={({ field }) => (
            <Field>

              <Combobox
                options={skillsOption}
                value={field.value}
                onChange={field.onChange}
              />


              {/* CHANGE: use form.formState.errors instead of fieldState.invalid */}
              {form.formState.errors.skills && (
                <small>
                  <FieldError
                    errors={[form.formState.errors.skills]}
                    className="text-xs text-red-600 mt-1"
                  />
                </small>
              )}

            </Field>
          )}
        />
        <div className='w-full flex items-center justify-start gap-2'>  
          <Button type="submit">
            Save Changes
          </Button>
          <Button type="button" variant="secondary" onClick={closeEditMode}>
            Cancel
          </Button>
        </div>

      </FieldGroup>
    </form>
  )
  
}

export default EditSkillSForm