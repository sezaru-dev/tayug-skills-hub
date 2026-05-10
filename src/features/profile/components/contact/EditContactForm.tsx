'use client'

import React from 'react'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  EditContactFormInput,
  EditContactFormSchema,
} from '../../schema'
import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { Input } from '@/components/ui/input'
import { useUpdateContact } from '../../mutations/use-update-contact'

type Props = {
  currentValue: string | null
  close: () => void
}

const EditContactForm = ({ currentValue, close }: Props) => {
  const { mutate, isPending } = useUpdateContact()

  const form = useForm<EditContactFormInput>({
    resolver: zodResolver(EditContactFormSchema),
    defaultValues: {
      phoneNumber: currentValue || '',
    },
  })

  const watchedPhoneNumber = form.watch('phoneNumber')

  const isUnchanged = watchedPhoneNumber === currentValue

  function onSubmit(data: EditContactFormInput) {
    const toastId = toast.loading('Updating phone...')

    mutate(
      { phoneNumber: data.phoneNumber },
      {
        onSuccess: () => {
          successToast(toastId, 'Changes saved successfully.')
          close()
        },
        onError: (err) => {
          errorToast(
            toastId,
            err instanceof Error ? err.message : 'Something went wrong.'
          )
        },
      }
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 mt-4">
      <FieldGroup>
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Phone Number</FieldLabel>

              <Input
                {...field}
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="09XXXXXXXXX"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '') // only numbers
                  field.onChange(value)
                }}
                className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition"
              />

              {form.formState.errors.phoneNumber && (
                <small>
                  <FieldError
                    errors={[form.formState.errors.phoneNumber]}
                    className="text-xs text-red-600 mt-1"
                  />
                </small>
              )}
            </Field>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending || isUnchanged}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>

          <Button type="button" variant="ghost" onClick={close}>
            Cancel
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export default EditContactForm

