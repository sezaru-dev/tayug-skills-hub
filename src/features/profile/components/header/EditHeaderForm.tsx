'use client'

import React from 'react'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

import {
  HeaderFormInput,
  HeaderFormSchema,
  MAXHEADLINELENGTH,
} from '../../schema'


import { BARANGAYS } from '../../constant'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { useUpdateProfileHeader } from '../../mutations/use-update-profile-header'
import { Barangay } from '@/features/service-provider.types'

export type HeaderData = {
  fullname: string
  headline?: string
  barangay: Barangay | null
}

type Props = {
  currentValue?: HeaderData
  close: () => void
}

const EditHeaderForm = ({ currentValue, close }: Props) => {
  const { mutate, isPending } = useUpdateProfileHeader()

  const form = useForm<HeaderFormInput>({
    resolver: zodResolver(HeaderFormSchema),
    defaultValues: {
      fullname: currentValue?.fullname || '',
      headline: currentValue?.headline || '',
      barangay: currentValue?.barangay || null,
    },
  })

  const watchedHeadline = form.watch('headline')
  const watchedFullname = form.watch('fullname')
  const watchedBarangay = form.watch('barangay')

  const isUnchanged =
    watchedFullname === currentValue?.fullname &&
    watchedHeadline === currentValue?.headline &&
    watchedBarangay === currentValue?.barangay

  async function onSubmit(data: HeaderFormInput) {
    const toastId = toast.loading('Updating profile header...')

    mutate(
      {
        fullname: data.fullname,
        headline: data.headline,
        barangay: data.barangay,
      },
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
      <FieldGroup>
        {/* FULLNAME */}
        <Controller
          name="fullname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Full name*</FieldLabel>

              <Input
                {...field}
                autoComplete="off"
                onChange={(e) => {
                  const value = e.target.value.replace(/\s{2,}/g, ' ')
                  field.onChange(value)
                }}
              />

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* HEADLINE */}
        <Controller
          name="headline"
          control={form.control}
          render={({ field }) => (
            <Field>
              <div className="flex justify-between">
                <FieldLabel>Headline</FieldLabel>
                <span className="text-xs text-gray-500">
                  {watchedHeadline?.length ?? 0} / {MAXHEADLINELENGTH}
                </span>
              </div>

              <Textarea
                {...field}
                rows={3}
                onChange={(e) => {
                  field.onChange(
                    e.target.value.slice(0, MAXHEADLINELENGTH)
                  )
                }}
              />
            </Field>
          )}
        />

        {/* BARANGAY */}
        <Controller
          name="barangay"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Barangay*</FieldLabel>

              <Select
                value={field.value ?? ''}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select barangay" />
                </SelectTrigger>

                <SelectContent>
                  {BARANGAYS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* ACTIONS */}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isPending || isUnchanged}
          >
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

export default EditHeaderForm