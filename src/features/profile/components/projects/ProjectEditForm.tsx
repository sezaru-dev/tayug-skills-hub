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
  EditProjectFormInput,
  EditProjectFormSchema,
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
import { Project } from '../../queries/use-get-project-by-projectid-and-id'
import { useEditProjectFlow } from '../../mutations/use-edit-project-flow'

type ProjectEditFormProps = {
  initialData: Project
}

const ProjectEditForm = ({ initialData }: ProjectEditFormProps) => {
  const { data: userSkills = [] } = useGetUserSkills()
  const safeUserSkills = Array.isArray(userSkills) ? userSkills : []
  const currentValue = safeUserSkills.map((skill:SkillWithCategory) => skill.id)
  const router = useRouter()
  const editprojectFlow = useEditProjectFlow()

const form = useForm<EditProjectFormInput>({
  resolver: zodResolver(EditProjectFormSchema),
  defaultValues: {
    imageFile: undefined,
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    liveUrl: initialData.liveUrl ?? "",
    skills: initialData.skills.map((s) => s.id), // important
  }
})

  const watchedDescription = form.watch("description")


async function onSubmit(data: EditProjectFormInput) {
  if (!data.imageFile && !initialData.imageUrl) {
    form.setError("imageFile", {
      message: "Please upload a project image.",
    })
    return
  }

  const toastId = toast.loading("Updating project...")

  try {
    await editprojectFlow.mutateAsync({
      projectId: initialData.id,

      // key part
      imageFile: data.imageFile ?? undefined,

      currentImagePublicId: initialData.imagePublicId ?? null,
      currentImageUrl: initialData.imageUrl ?? null,

      title: data.title,
      description: data.description,
      liveUrl: data.liveUrl,
      skills: data.skills,
    })

    successToast(toastId, "Project updated successfully.")

    // navigate back to project list
    router.back()
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
                  initialImageUrl={initialData.imageUrl}
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
          <Button type="submit" variant="default" disabled={editprojectFlow.isPending}>
            {editprojectFlow.isPending ? "Updating..." : "Save Project"}
          </Button>
        </div>

      </FieldGroup>
    </form>
  )
}

export default ProjectEditForm