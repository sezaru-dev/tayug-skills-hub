'use client'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ChangePasswordInput, ChangePasswordSchema } from '../../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import ShowHidePasswordButton from '@/components/custom/ShowHidePasswordButton'
import { useChangePassword } from '@/features/account/mutations/use-change-password'

const ChangePasswordForm = () => {
  const [visible, setVisible] = useState({
    current: false,
    password: false,
    confirm: false,
  });
  const { mutate, isPending } = useChangePassword()


  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword:  '',
      newPassword:  '',
      confirmNewPassword:  '',
    },
  })

     async function onSubmit(data: ChangePasswordInput) {
        const toastId = toast.loading('Updating Password...')
    
        mutate(
          {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
          {
            onSuccess: () => {
              successToast(toastId, 'Password updated successfully.')
              form.reset()

              setVisible({
                current: false,
                password: false,
                confirm: false,
              })
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
          name="currentPassword"
          control={form.control}
          render={({field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-input-password">
                Current Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={visible.current ? "text" : "password"}
                  id="form-input-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                />
                <ShowHidePasswordButton show={visible.current} onToggle={() => 
                  setVisible((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }/>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />

        <Controller
            name="newPassword"
            control={form.control}
            render={({field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-input-password">
                  New Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    type={visible.password ? "text" : "password"}
                    id="form-input-password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                  />
                  <ShowHidePasswordButton show={visible.password} onToggle={() => 
                    setVisible((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }/>
                </div>
                <FieldDescription className="text-xs">
                  At least 8 chars, with uppercase, lowercase, number & symbol.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}/>
                )}
              </Field>
            )}
          />
        <Controller
          name="confirmNewPassword"
          control={form.control}
          render={({field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-input-password">
                Confirm New Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={visible.confirm ? "text" : "password"}
                  id="form-input-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                />
                <ShowHidePasswordButton show={visible.confirm} onToggle={() => 
                  setVisible((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }/>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />



        </FieldGroup>

        {/* ACTIONS */}
        <div className="flex gap-2 justify-end w-full">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
    </form>
  )
}

export default ChangePasswordForm