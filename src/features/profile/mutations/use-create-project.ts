import { useMutation, useQueryClient } from "@tanstack/react-query"

type CreateProjectPayload = {
  imageUrl: string
  imagePublicId: string
  title: string
  description: string
  liveUrl?: string
  skills: string[]
}

type Skill = {
  id: string
  name: string
  category: {
    id: string
    name: string
    isActive: boolean
  }
}

type Project = {
  id: string
  title: string
  description: string
  liveUrl: string | null
  imageUrl: string | null
  imagePublicId: string
  skills: {
    skill: Skill
  }[]
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation<Project, Error, CreateProjectPayload>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/provider/me/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Create project failed")

      return res.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-projects", "me"],
      })
    },
  })
}