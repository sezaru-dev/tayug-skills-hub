import { useQuery } from "@tanstack/react-query"

export function useGetSavedProviderIds() {
  return useQuery<string[]>({
    queryKey: ["saved-provider-ids"],
    queryFn: async () => {
      const res = await fetch(`/api/saved-providers/ids`)

      if (!res.ok) throw new Error("Failed to fetch saved providers")

      const data = await res.json()

      return data
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}