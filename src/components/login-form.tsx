"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import Link from "next/link"
import { signIn } from "next-auth/react"
import ShowHidePasswordButton from "./custom/ShowHidePasswordButton"
import { useState } from "react"

export const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .nonempty("Password is required")
  })


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
  
   async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: '/dashboard'
      })

    } catch (err) {
      console.error(err);
    }
    }
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Access your account using your email/password or Google
        </p>
      </div>

      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
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
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
              )}
            />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-input-password">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="form-input-password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                  />
                  <ShowHidePasswordButton show={showPassword} onToggle={() => setShowPassword(prev => !prev)}/>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
              )}
            />
          <Field>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" form="login-form">Login</Button>
            {/* <Button variant="outline" type="button" onClick={() => signIn("google", {callbackUrl: "/dashboard"})}>
              Continue with Google
            </Button> */}
          </Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
            </FieldDescription>
        </FieldGroup>
      </form>

    </div>
  )
}
