"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import ShowHidePasswordButton from "./custom/ShowHidePasswordButton"
import { useState } from "react"
import { signIn } from "next-auth/react"


export const formSchema = z.object({
  name: z.string().min(3, { 
    message: "Name must be at least 3 characters." 
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      {
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      }
    )
  })

export function SignupForm({
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
      /* console.log(data); */
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })

        if (!res.ok) {
          const err = await res.json()
          console.log(err.error);
          return
        }

        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: '/dashboard'
        })

      } catch (err) {
        console.error(err);
      }
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Enter your information below to create your account
        </p>
      </div>

      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-input-name">
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-input-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}/>
                )}
              </Field>
            )}
          />
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
                  <FieldError errors={[fieldState.error]}/>
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
                <FieldDescription className="text-xs">
                  At least 8 chars, with uppercase, lowercase, number & symbol.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}/>
                )}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" form="signup-form">Create Account</Button>
{/*                 <Button variant="outline" type="button" onClick={() => signIn("google", {callbackUrl: "/dashboard"})}>
              Sign up with Github
            </Button> */}
          </Field>
            <FieldDescription className="text-center">
              Already have an account? <Link href="/auth/login">Sign in</Link>
            </FieldDescription>
        </FieldGroup>

      </form>

    </div>
  )
}