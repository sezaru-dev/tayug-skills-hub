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
import { Textarea } from '@/components/ui/textarea'

import {
  EditAboutFormInput,
  EditAboutFormSchema,
  MAXBIOLENGTH,
} from '../../schema'

import { useUpdateProfileAbout } from '../../mutations/use-update-profile-about'
import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'

type Props = {
  currentValue: string
  close: () => void
}

const EditAboutForm = ({ currentValue, close }: Props) => {
  const { mutate, isPending } = useUpdateProfileAbout()

  const form = useForm<EditAboutFormInput>({
    resolver: zodResolver(EditAboutFormSchema),
    defaultValues: {
      about: currentValue || '',
    },
  })

  const watchedAbout = form.watch('about')

  const isUnchanged = watchedAbout === currentValue

  function onSubmit(data: EditAboutFormInput) {
    const toastId = toast.loading('Updating about...')

    mutate(
      { about: data.about },
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
          name="about"
          control={form.control}
          render={({ field }) => (
            <Field>
              <div className="flex justify-between">
                <FieldLabel>Tell people about you</FieldLabel>

                <span
                  className={`text-xs ${
                    (watchedAbout?.length ?? 0) >= MAXBIOLENGTH
                      ? 'text-red-600'
                      : 'text-gray-500'
                  }`}
                >
                  {watchedAbout?.length ?? 0} / {MAXBIOLENGTH}
                </span>
              </div>

              <Textarea
                {...field}
                rows={6}
                onChange={(e) => {
                  field.onChange(
                    e.target.value
                      .replace(/\s{2,}/g, ' ')
                      .slice(0, MAXBIOLENGTH)
                  )
                }}
              />
              {form.formState.errors.about && (
                <small>
                  <FieldError
                    errors={[form.formState.errors.about]}
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

          <Button
            type="button"
            variant="ghost"
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export default EditAboutForm

