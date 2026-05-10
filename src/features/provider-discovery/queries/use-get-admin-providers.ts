import { Barangay } from "@/features/service-provider.types"
import { useQuery } from "@tanstack/react-query"

type Skill = {
  id: string
  name: string
}

export type AdminServiceProviders = {
  id: string
  fullname: string
  email: string
  barangay: Barangay
  skills: Skill[]
  isPublished: boolean
  createdAt: string
}

export function useGetAdminServiceProviders() {

  return useQuery<AdminServiceProviders[]>({
    queryKey: ["admin-service-providers"],

    queryFn: async () => {

      const res = await fetch(`/api/admin/service-providers`)

      if (!res.ok) throw new Error("Failed to fetch service providers")

      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}