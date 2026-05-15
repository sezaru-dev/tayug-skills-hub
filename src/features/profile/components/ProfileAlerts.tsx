'use client'

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { usePublishProfile } from '../mutations/use-publish-profile'
import { errorToast, successToast } from '@/components/utils/custom-toast'

type ProfileAlertProps = {
  isProfileComplete: boolean
  isPublished: boolean
  onPublish?: () => void
}

const ProfileAlert = ({
  isProfileComplete,
  isPublished,
}: ProfileAlertProps) => {
  const { mutate, isPending } = usePublishProfile()
  const isReadyToPublish = isProfileComplete && !isPublished
  const isDraft = !isProfileComplete && !isPublished

const handlePublish = () => {
  const toastId = toast.loading("Publishing profile...")

  mutate(undefined, {
    onSuccess: () => {
      successToast(toastId, "Profile published successfully.")
      close()
    },
    onError: (err) => {
      errorToast(
        toastId,
        err instanceof Error ? err.message : "Something went wrong."
      )
    },
  })
}

  if (isPublished) {
    return (
      <Alert className="border bg-green-50 text-green-700">
        <AlertDescription className="flex gap-2 items-center">
          <Check size={16} />
          Your profile is live and visible to clients
        </AlertDescription>
      </Alert>
    )
  }

  if (isDraft) {
    return (
      <Alert className="border bg-white text-gray-600 p-4 flex items-center justify-between flex-wrap">
        <AlertTitle>
          Complete your profile to get it ready for publishing.
        </AlertTitle>
        <Button
          variant="default"
          disabled={!isProfileComplete}
          onClick={handlePublish}
        >
          Publish Profile
        </Button>
      </Alert>
    )
  }

  if (isReadyToPublish) {
    return (
      <Alert className="border bg-white text-gray-600 p-4 flex items-center justify-between">
        <AlertTitle className='text-xs sm:text-sm'>
          You can now publish your profile to make it visible.
        </AlertTitle>
        <Button
          variant="default"
          onClick={handlePublish}
          disabled={isPending}
        >
          Publish Profile
        </Button>
      </Alert>
    )
  }

  return null
}

export default ProfileAlert