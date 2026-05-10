'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { AdminAccountDetailsInput, AdminAccountDetailsSchema } from '../schema'
import { AdminAccountInfoFormType } from '../types'
import { useChangeAccountInfo } from '../mutations/use-change-admin-account-info'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


type Props = {
  data: AdminAccountInfoFormType
}

const AccountInfoForm = ({data}: Props) => {
  const {mutateAsync, isPending} = useChangeAccountInfo()
  const router = useRouter()
  const form = useForm<AdminAccountDetailsInput>({
    resolver: zodResolver(AdminAccountDetailsSchema),
    defaultValues: {
      name: data.name  ?? '',
      email: data.email,
    }
  })
  const watchedName = form.watch('name')
  const watchedEmail = form.watch('email')

  const isUnchanged = watchedName === data?.name && watchedEmail === data?.email

  async function onSubmit(data: AdminAccountDetailsInput) {
    const toastId = toast.loading('Updating Account Info...')
    mutateAsync(
      {
        name: data.name,

        email: data.email,
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>        
        <div className='p-6 w-full'>
          <header className='mb-4'>
            <h2 className='text-xl font-medium'>Account Info</h2>
            <p className='text-sm text-gray-500'>Complete your personal details for your account.</p>
          </header>
          <div className='grid grid-cols-1 gap-4 text-sm'>
            
            <Controller
              name="name"
              control={form.control}
              render={({field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-input-name">
                    Fullname
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-input-name"
                    aria-invalid={fieldState.invalid}
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

            {/* email */}
            <Controller
              name="email"
              control={form.control}
              render={({field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-input-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-input-email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
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

          </div>
          <div className='w-full flex justify-end mt-4'>
            <Button
              type="submit"
              disabled={isPending || isUnchanged}
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </FieldGroup>
    </form>
  )
}

export default AccountInfoForm