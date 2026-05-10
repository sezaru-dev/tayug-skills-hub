import { useQuery } from "@tanstack/react-query"

export function useGetUserSkills() {

  return useQuery({
    queryKey: ["user-skills"],

    queryFn: async () => {

      const res = await fetch(`/api/provider/me/skills`)

      if (!res.ok) throw new Error("Failed to fetch skills")

      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}