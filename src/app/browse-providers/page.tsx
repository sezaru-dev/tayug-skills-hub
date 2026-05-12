"use client"

import { MultiSelectFilter } from "@/components/custom/MultiSelectFilter"
import SearchFilter from "@/components/custom/SearchFilter"
import { ServiceProviderCard } from "@/components/custom/ServiceProviderCard"
import { Button } from "@/components/ui/button"
import { useGetActiveCategories } from "@/features/categories/queries/use-get-active-categories"
import { useGetProviders } from "@/features/provider-discovery/queries/use-get-providers"
import { useSearchParams } from "next/navigation"


const BrowseProvidersPage = () => {
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
    <main className="max-w-7xl mx-auto px-4 py-10 min-h-screen mt-16">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Browse Service Provider</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Explore available service providers, view their profiles, and connect
          with the right skills for your needs.
        </p>
      </header>

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
            <ServiceProviderCard key={provider.id} {...provider} />
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
    </main>
  )
}

export default BrowseProvidersPage