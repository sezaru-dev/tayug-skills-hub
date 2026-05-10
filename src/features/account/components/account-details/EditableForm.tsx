'use client'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AccountProfileInput, AccountProfileSchema } from '../../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BARANGAYS } from '@/features/profile/constant'
import { Button } from '@/components/ui/button'
import { useUpdateProfileHeader } from '@/features/profile/mutations/use-update-profile-header'
import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { ProfileType } from '@/features/service-provider.types'
import { useRouter } from 'next/navigation'

type Props = {
  profile?: Pick<ProfileType, 'fullname' | 'barangay'>
}

const EditableForm = ({ profile }: Props) => {
  const { mutateAsync, isPending } = useUpdateProfileHeader()
  const router = useRouter()

  const form = useForm<AccountProfileInput>({
    resolver: zodResolver(AccountProfileSchema),
    defaultValues: {
      fullname: profile?.fullname || '',
      barangay: profile?.barangay || null,
    },
  })

    const watchedFullname = form.watch('fullname')
    const watchedBarangay = form.watch('barangay')

    const isUnchanged = watchedFullname === profile?.fullname && watchedBarangay === profile?.barangay

     async function onSubmit(data: AccountProfileInput) {
        const toastId = toast.loading('Updating profile...')
    
        mutateAsync(
          {
            fullname: data.fullname,

            barangay: data.barangay,
          },
          {
            onSuccess: () => {
              successToast(toastId, 'Changes saved successfully.')
              router.refresh()
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
        <Controller
          name="fullname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Full name</FieldLabel>

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

        {/* BARANGAY */}
        <Controller
          name="barangay"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Barangay</FieldLabel>

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

        </FieldGroup>

        {/* ACTIONS */}
        {/* isPending || isUnchanged */}
        <div className="flex gap-2 justify-end w-full">
          <Button
            type="submit"
            disabled={isPending || isUnchanged}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>

        </div>
    </form>
  )
}

export default EditableForm