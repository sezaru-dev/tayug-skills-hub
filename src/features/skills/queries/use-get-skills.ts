import { GetParameters } from "@/app/api/categories/route"
import { useQuery } from "@tanstack/react-query"

type UseGetSkillsProps = {
  params?: GetParameters
}

export function useGetSkills({ params }: UseGetSkillsProps = {}) {
  const normalizedParams = params ?? {}
  return useQuery({
    queryKey: ["skills", JSON.stringify(normalizedParams)],

    queryFn: async () => {
      const query = new URLSearchParams()

      if (params?.limit) query.set("limit", String(params.limit))
      if (params?.sortBy) query.set("sortBy", params.sortBy)
      if (params?.sortOrder) query.set("sortOrder", params.sortOrder)
      if (params?.idAndNameOnly)
        query.set("idAndNameOnly", String(params.idAndNameOnly))

      const res = await fetch(`/api/skills?${query.toString()}`)

      if (!res.ok) throw new Error("Failed to fetch skills")

      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}