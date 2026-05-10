"use client"

import React from 'react'
import { MultiSelectFilter } from "@/components/custom/MultiSelectFilter"
import SearchFilter from "@/components/custom/SearchFilter"
import { ServiceProviderCardWithBookmark } from "@/components/custom/ServiceProviderCardWithBookmark"
import { Button } from "@/components/ui/button"
import { useGetProviders } from "@/features/provider-discovery/queries/use-get-providers"
import { useSearchParams } from "next/navigation"
import { useGetActiveCategories } from '@/features/categories/queries/use-get-active-categories'

type Props = {
  userId:string
}

const BrowseProviderSection = ({userId}:Props) => {
    const searchParams = useSearchParams()

  const search = searchParams.get("search") ?? ""

  const categories = searchParams.get("categories")
    ? searchParams.get("categories")!.split(",")
    : []

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, } = useGetProviders({
    search,
    categories,
  })
  const {data: activeCategories} = useGetActiveCategories()
  const providers = data?.pages.flatMap((page) => page.data) ?? []
  return (
    <section className="mb-8 space-y-4">
      {/* FILTERS */}
      <div className="flex items-center gap-4 py-4">
        <SearchFilter />
        <MultiSelectFilter label="Category" options={activeCategories} />
      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-min">
        {isLoading && <p>Loading...</p>}

        {providers.map((provider: any) => (
          <ServiceProviderCardWithBookmark key={provider.id} userId={userId} {...provider} />
        ))}
      </div>
      {/* PAGINATION */}

      <div className="flex items-center justify-center my-6">
        {hasNextPage && (
          <Button variant='outline' onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        )}
      </div>
    </section>
  )
}

export default BrowseProviderSection