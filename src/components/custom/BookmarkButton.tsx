'use client'

import { useSaveProvider } from '@/features/saved-provider/mutations/use-save-provider'
import { useUnsaveProvider } from '@/features/saved-provider/mutations/use-unsave-provider'
import { useGetSavedProviderIds } from '@/features/saved-provider/query/use-get-saved-provider-ids'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Bookmark, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type BookmarkButtonProps = {
  id: string
}

export function BookmarkButton({id}: BookmarkButtonProps) {
  const {mutateAsync: saveProvider, isPending: isSaving} = useSaveProvider()
  const {mutateAsync: removeProvider, isPending: isRemoving} = useUnsaveProvider()
  const { data: savedIds } = useGetSavedProviderIds()
  const router = useRouter()

  const isBookmarked = savedIds?.includes(id)

  const isMutating = isSaving || isRemoving

  const handleBookmarkClick = async () => {
    if (isMutating) return

    const action = isBookmarked
      ? removeProvider
      : saveProvider

    await action({
      providerId: id,
    })

    router.refresh()
  }

  return (
    <Button
      onClick={handleBookmarkClick}
      disabled={isMutating}
      className="absolute top-3 right-3 rounded-full p-2 transition hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-70"
      aria-label="Bookmark provider"
      variant="ghost"
      size="icon"
    >
      {isMutating ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <Bookmark
          className={cn(
            'h-4 w-4 transition-colors',
            isBookmarked
              ? 'fill-indigo-500 text-indigo-500'
              : 'text-gray-400'
          )}
        />
      )}
    </Button>
  )
}