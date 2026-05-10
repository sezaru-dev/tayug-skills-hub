import { useQuery } from "@tanstack/react-query"

type PhoneResponse = {
  phoneNumber: string | null
}

export function useGetProfilePhone() {
  return useQuery<string | null>({
    queryKey: ["profile-phone"],
    queryFn: async () => {
      const res = await fetch(`/api/provider/me/contact`)

      if (!res.ok) throw new Error("Failed to fetch phone number")

      const data: PhoneResponse = await res.json()

      return data.phoneNumber ?? null
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}