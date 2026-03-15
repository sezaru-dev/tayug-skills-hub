import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
  return (
    <div className="flex-1 space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between flex-col md:flex-row gap-2 mb-4">
        <Skeleton className="h-10 w-full md:w-96" />
        <Skeleton className="h-10 w-full md:w-48" />
      </div>

      {/* Table / list skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}

export default LoadingSkeleton