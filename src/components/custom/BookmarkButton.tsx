'use client'

import { useSaveProvider } from '@/features/saved-provider/mutations/use-save-provider'
import { useUnsaveProvider } from '@/features/saved-provider/mutations/use-unsave-provider'
import { useGetSavedProviderIds } from '@/features/saved-provider/query/use-get-saved-provider-ids'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

type BookmarkButtonProps = {
  id: string
}

export function BookmarkButton({ id }:BookmarkButtonProps) {
  const { mutateAsync: saveProvider } = useSaveProvider()
  const { mutateAsync: removeProvider } = useUnsaveProvider()
  const { data: savedIds } = useGetSavedProviderIds()
  const router = useRouter()


  const isBookmarked = savedIds?.includes(id)

  const handleBookmarkClick = async () => {
    const action = isBookmarked ? removeProvider : saveProvider

    await action({ providerId: id })

    router.refresh()
  }



  return (
    <Button
      onClick={handleBookmarkClick}
      className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100  transition"
      aria-label="Bookmark provider"
      variant="ghost"
      size="icon"
    >
      <Bookmark
        className={cn(
          "w-4 h-4 transition-colors",
          isBookmarked
            ? "fill-indigo-500 text-indigo-500"
            : "text-gray-400"
        )}
      />
    </Button>
  )
}
