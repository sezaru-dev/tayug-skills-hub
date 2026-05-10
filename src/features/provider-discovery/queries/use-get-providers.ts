import { useInfiniteQuery } from "@tanstack/react-query"

export type GetProvidersParams = {
  search?: string
  categories?: string[]
}

async function fetchProviders({
  search,
  categories,
  cursor,
}: {
  search?: string
  categories?: string[]
  cursor?: string | null
}) {
  const params = new URLSearchParams()

  if (search) {
    params.set("search", search)
  }

  if (categories && categories.length > 0) {
    params.set("categories", categories.join(","))
  }

  if (cursor) {
    params.set("cursor", cursor)
  }

  const res = await fetch(`/api/public/users?${params.toString()}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch providers")
  }

  return data
}

export function useGetProviders({
  search = "",
  categories = [],
}: GetProvidersParams) {
  return useInfiniteQuery({
    queryKey: ["providers", search, categories],

    queryFn: ({ pageParam = null }) =>
      fetchProviders({
        search,
        categories,
        cursor: pageParam,
      }),

    getNextPageParam: (lastPage) => lastPage.nextCursor,

    initialPageParam: null,

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}