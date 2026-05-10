import { useQuery } from "@tanstack/react-query"

type Skill = {
  id: string
  name: string
  category: {
    id: string
    name: string
    isActive: boolean
  }
}

export type Project = {
  id: string
  title: string
  description: string | null
  liveUrl: string | null
  imageUrl: string | null
  imagePublicId: string | null
  skills: Skill[]
}

export function useGetProjectsByUserId() {

  return useQuery<Project[]>({
    queryKey: ["provider-projects", "me"],

    queryFn: async () => {

      const res = await fetch(`/api/provider/me/projects`)

      if (!res.ok) throw new Error("Failed to fetch provider projects")

      return res.json()
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}