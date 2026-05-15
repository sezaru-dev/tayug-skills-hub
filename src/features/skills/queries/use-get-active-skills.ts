import { useQuery } from "@tanstack/react-query"

export function useGetActiveSkills() {
  return useQuery({
    queryKey: ["active-skills"],

   queryFn: async () => {
      const res = await fetch("/api/skills/active-skills-category")
      if (!res.ok) throw new Error("Failed to fetch skills")
      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}