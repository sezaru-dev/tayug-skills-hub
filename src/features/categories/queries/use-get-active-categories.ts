import { useQuery } from "@tanstack/react-query"

export type ActiveCategory = {
  id: string
  name: string
  slug: string
  isActive: boolean
}

export function useGetActiveCategories() {

  return useQuery<ActiveCategory[]>({
    queryKey: ["active-categories"],

    queryFn: async () => {

      const res = await fetch(`/api/categories/active`)

      if (!res.ok) throw new Error("Failed to fetch active categories")

      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}