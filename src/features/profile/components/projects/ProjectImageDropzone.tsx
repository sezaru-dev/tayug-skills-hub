'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '@/components/ui/field'
import { ControllerRenderProps, FieldError as RHFFieldError } from 'react-hook-form'
import { EditProjectFormInput, ProjectFormInput } from '../../schema'
import { Button } from '@/components/ui/button'

type Props = {
  field: ControllerRenderProps<ProjectFormInput, 'imageFile'> | ControllerRenderProps<EditProjectFormInput, 'imageFile'>
  error?: RHFFieldError
  maxSizeMB?: number
  initialImageUrl?: string | null
}

const ProjectImageDropzone = ({
  field,
  error,
  maxSizeMB = 3,
  initialImageUrl
}: Props) => {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const file = field.value
  const isNewFile = file instanceof File

  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  // create/revoke object URL only when file changes
  useEffect(() => {
    if (!isNewFile || !file) {
      setObjectUrl(null)
      return
    }

    const url = URL.createObjectURL(file)
    setObjectUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [file, isNewFile])

  const previewUrl = isNewFile ? objectUrl : initialImageUrl

  function handleFile(file?: File) {
    if (!file) return

    const max = maxSizeMB * 1024 * 1024
    if (file.size > max) return

    field.onChange(file)

    if (inputRef.current) {
      const dt = new DataTransfer()
      dt.items.add(file)
      inputRef.current.files = dt.files
    }
  }

  return (
    <Field>
      <FieldLabel>Project image</FieldLabel>

      <div className="space-y-2">

        {/* DROPZONE */}
        <div
          className={`
            relative group border-2 border-dashed rounded-md overflow-hidden transition
            ${isDragging ? 'border-blue-700 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          `}
          onDragEnter={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragging(false)

            handleFile(e.dataTransfer.files?.[0])
          }}
        >

          {/* PREVIEW */}
          {previewUrl ? (
            <div className="relative aspect-video w-full">
              <Image
                src={previewUrl}
                alt="Project preview"
                fill
                className="object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-white text-sm font-medium">
                  Change image
                </p>
              </div>

              {/* RESET BUTTON (ONLY WHEN NEW FILE IS SELECTED) */}
              {isNewFile && (
                <Button
                  type="button"
                  size='sm'
                  onClick={() => {
                    field.onChange(undefined)

                    if (inputRef.current) {
                      inputRef.current.value = ''
                    }
                  }}
                  className="absolute top-2 right-2 text-xs bg-black/60 text-white rounded z-50"
                >
                  Reset
                </Button>
              )}
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center text-sm text-gray-400 flex-col gap-4">
              <Upload className={isDragging ? 'text-blue-700' : ''} />

              {isDragging ? (
                <p className="text-blue-700 font-medium">
                  Drop image here
                </p>
              ) : (
                <p>Click or drag to upload image</p>
              )}
            </div>
          )}

          {/* INPUT */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              handleFile(e.target.files?.[0])
            }}
          />
        </div>

        <FieldDescription>
          Supported formats: JPG, PNG, WEBP • Max size: 3MB
        </FieldDescription>

        {error && <FieldError errors={[error]} />}
      </div>
    </Field>
  )
}

export default ProjectImageDropzone