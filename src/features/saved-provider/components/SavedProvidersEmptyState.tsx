import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SavedProvidersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">

      <div className="text-xl mb-2">No saved providers</div>

      <p className="text-sm text-muted-foreground max-w-md">
        You haven’t bookmarked any providers yet. Save ones you’re interested in to easily access them later.
      </p>

      <Link href="/dashboard/browse-providers" className="mt-6">
        <Button variant="secondary">
          Browse providers
        </Button>
      </Link>
    </div>
  )
}