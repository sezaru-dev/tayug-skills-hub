'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddSkillFormInput, AddSkillFormSchema } from '../schema'
import SelectCategory from './SelectCategory'
import { toast } from 'sonner'
import useCreateSkill from '../mutations/use-create-skill'
import { errorToast, successToast } from '@/components/utils/custom-toast'

type AddSkillFormProps = {
  closeDialog: () => void
}

export default function AddSkillForm({closeDialog}: AddSkillFormProps) {
  const {mutate, isPending} = useCreateSkill()

  const form = useForm<AddSkillFormInput>({
    resolver: zodResolver(AddSkillFormSchema),
    defaultValues: {
      name: "",
      categoryId: "",
    }
  })

  // form submit
    async function onSubmit(data: AddSkillFormInput) {

      const toastId = toast.loading("Creating skill...")
  
      mutate(
        { name: data.name, categoryId: data.categoryId },
        {
          onSuccess: () => {
            successToast(toastId, "Skill has been created.")
            closeDialog()
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
      className="grid gap-4"
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
            </Field>
          )}
        />
        <Controller
          name="name"
          control={form.control}
          render={({field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-input-skill-name">
                Skill Name
              </FieldLabel>
              <Input
                {...field}
                id="form-input-skill-name"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
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
            </Field>
          )}
        />

      </FieldGroup>
      <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">Add Skill</Button>
    </form>
  )
}
