'use client'

import { ServiceProviderCardSkeleton } from "./SavedProvidersSkeleton"

export function SavedProvidersListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ServiceProviderCardSkeleton key={i} />
      ))}
    </div>
  )
}