'use client'

import { Card } from "@/components/ui/card"

export function ServiceProviderCardSkeleton() {
  return (
    <Card className="relative flex flex-col p-5 rounded-xl border bg-background overflow-hidden">

      {/* shimmer layer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Bookmark */}
      <div className="absolute top-4 right-4 h-8 w-8 rounded-md bg-muted/80" />

      <div className="flex gap-4 items-start">

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-muted/80 shrink-0" />

        <div className="flex-1 min-w-0 flex flex-col gap-2">

          {/* Name */}
          <div className="h-4 w-3/4 rounded bg-muted/80" />

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            <div className="h-5 w-16 rounded-full bg-muted/80" />
            <div className="h-5 w-20 rounded-full bg-muted/80" />
            <div className="h-5 w-14 rounded-full bg-muted/80" />
          </div>

          {/* Location */}
          <div className="h-3 w-1/2 rounded bg-muted/80" />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 h-9 rounded-md bg-muted/80" />
    </Card>
  )
}