'use client'

import React from 'react'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

import {
  MAXDESCRIPTIONLENGTH,
  ProjectFormInput,
  ProjectFormSchema
} from '../../schema'

import ProjectImageDropzone from './ProjectImageDropzone'
import ProjectSkillsCombobox from './ProjectSkillsCombobox'
import { useGetUserSkills } from '../../queries/use-get-user-skills'
import { SkillWithCategory } from '../skills/EditSkillsDialog'
import { toast } from 'sonner'
import { errorToast, successToast } from '@/components/utils/custom-toast'
import { useRouter } from 'next/navigation'
import { useCreateProjectFlow } from '../../mutations/use-create-project-flow'

const ProjectForm = () => {
  const { data: userSkills = [] } = useGetUserSkills()
  const safeUserSkills = Array.isArray(userSkills) ? userSkills : []
  const currentValue = safeUserSkills.map((skill:SkillWithCategory) => skill.id)
  const router = useRouter()
  const projectFlow = useCreateProjectFlow()

  const form = useForm<ProjectFormInput>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      imageFile: undefined,
      title: "",
      description: "",
      skills: [],
      liveUrl: ""
    }
  })

  const watchedDescription = form.watch("description")


async function onSubmit(data: ProjectFormInput) {
  console.log("UPLOAD HIT", Date.now())
  const toastId = toast.loading("Creating Project...")

  try {
    await projectFlow.mutateAsync(data)

    successToast(toastId, "Project has been created.")
    router.replace("/dashboard/manage-profile")
  } catch (err) {
    errorToast(
      toastId,
      err instanceof Error ? err.message : "Something went wrong."
    )
  }
}


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <FieldGroup>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-4 space-y-6">

            <Controller
              name="imageFile"
              control={form.control}
              render={({ field, fieldState }) => (
                <ProjectImageDropzone
                  field={field}
                  error={fieldState.error}
                  maxSizeMB={3}
                />
              )}
            />

          </div>

          {/* RIGHT SIDE  */}
          <div className="lg:col-span-3 space-y-6">

            {/* TITLE */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Project title</FieldLabel>

                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="e.g. E-commerce Website"
                    onBlur={(e) => {
                      field.onChange(e.target.value.trim())
                      field.onBlur()
                    }}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* DESCRIPTION */}
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <div className="flex justify-between items-center">
                    <FieldLabel>Description</FieldLabel>

                    <span className={`text-xs ${
                      (watchedDescription?.length ?? 0) >= MAXDESCRIPTIONLENGTH
                        ? 'text-red-600'
                        : 'text-gray-500'
                    }`}>
                      {watchedDescription?.length ?? 0} / {MAXDESCRIPTIONLENGTH}
                    </span>
                  </div>

                  <Textarea
                    {...field}
                    className='resize-none'
                    placeholder="Describe your project, what you built, and your role..."
                    rows={5}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\s{2,}/g, " ")
                        .slice(0, MAXDESCRIPTIONLENGTH)

                      field.onChange(value)
                    }}
                  />

                  {form.formState.errors.description && (
                    <FieldError errors={[form.formState.errors.description]} />
                  )}
                </Field>
              )}
              />


            {/* LIVEURL */}
            <Controller
              name="liveUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='flex items-center space-x-1'>Live URL <span className="text-gray-400 text-xs">(optional)</span></FieldLabel>

                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="https://your-project.com"
                    onBlur={(e) => {
                      field.onChange(e.target.value.trim())
                      field.onBlur()
                    }}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="skills"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Skills</FieldLabel>


                  <ProjectSkillsCombobox
                    options={userSkills}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />


                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <Button type="submit" variant="default" disabled={projectFlow.isPending}>
            {projectFlow.isPending ? "Creating..." : "Save Project"}
          </Button>
        </div>

      </FieldGroup>
    </form>
  )
}

export default ProjectForm