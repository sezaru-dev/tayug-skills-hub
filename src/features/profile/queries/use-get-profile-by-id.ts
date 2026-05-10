import { useQuery } from "@tanstack/react-query"

export function useGetProfileById() {

  return useQuery({
    queryKey: ["profile"],

    queryFn: async () => {

      const res = await fetch(`/api/provider/me`)

      if (!res.ok) throw new Error("Failed to fetch profile")

      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}