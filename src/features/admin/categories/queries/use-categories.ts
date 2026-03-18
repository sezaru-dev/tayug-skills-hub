import { GetParameters } from "@/app/api/categories/route"
import { useQuery } from "@tanstack/react-query"

export function useCategories(params?: GetParameters) {
  return useQuery({
    queryKey: ["categories", params],

    queryFn: async () => {
      const query = new URLSearchParams()

      if (params?.limit) query.set("limit", String(params.limit))
      if (params?.sortBy) query.set("sortBy", params.sortBy)
      if (params?.sortOrder) query.set("sortOrder", params.sortOrder)
      if (params?.idAndNameOnly)
        query.set("idAndNameOnly", String(params.idAndNameOnly))

      const res = await fetch(`/api/categories?${query.toString()}`)

      if (!res.ok) throw new Error("Failed to load categories. Please try again")

      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}