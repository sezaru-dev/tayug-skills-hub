'use client'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { DeleteAccountInput, DeleteAccountSchema } from '../../../schema'
import { Checkbox } from '@/components/ui/checkbox'
import ShowHidePasswordButton from '@/components/custom/ShowHidePasswordButton'
import { useDeleteAccount } from '../../../mutations/use-delete-account'
import { signOut } from 'next-auth/react'

const DeleteAccountForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { mutateAsync, isPending } = useDeleteAccount()

  const form = useForm<DeleteAccountInput>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      confirmed: false,
      password: ''
    },
  })

  const watchedConfirmed = form.watch('confirmed')
  const watchedPassword = form.watch('password')

  const isDeleteDisabled = !watchedConfirmed || watchedPassword.length === 0

async function onSubmit(data: DeleteAccountInput) {
  const toastId = toast.loading("Deleting account...")

  try {
    await mutateAsync({ password: data.password })

    successToast(toastId, "Account deleted successfully.")

    // clear session FIRST
    await signOut({callbackUrl: "/auth/login"})

    /* // 3. hard redirect LAST
    window.location.replace("/auth/login") */
  } catch (err) {
    errorToast(
      toastId,
      err instanceof Error ? err.message : "Something went wrong."
    )
  }
}
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full border rounded-md p-6">
      <FieldGroup>
        <Controller
          name="confirmed"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="confirm"
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(Boolean(val))}
                />

                <FieldLabel htmlFor="confirm" className="text-sm leading-tight">
                  I understand this action cannot be undone.
                </FieldLabel>
                </div>

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-input-password">
                Enter your password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  id="form-input-password"
                  aria-invalid={fieldState.invalid}
                />
                <ShowHidePasswordButton show={showPassword} onToggle={() => setShowPassword(prev => !prev)}/>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
        </FieldGroup>

        <div className="flex gap-2 justify-end w-full">
          <Button
            variant="destructive"
            size="lg"
            type="submit"
            disabled={isPending || isDeleteDisabled}
          >
            {isPending ? 'Deleting...' : 'Delete account'}
          </Button>
        </div>
    </form>
  )
}

export default DeleteAccountForm