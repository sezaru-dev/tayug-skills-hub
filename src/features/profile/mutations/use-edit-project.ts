import { useMutation, useQueryClient } from "@tanstack/react-query"

type EditProjectPayload = {
  projectId: string
  imageUrl: string | null
  imagePublicId: string | null
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



export function useEditProject() {
  const queryClient = useQueryClient()

  return useMutation<Project, Error, EditProjectPayload>({
    mutationFn: async (payload) => {
      const res = await fetch(
        `/api/provider/me/projects/${payload.projectId}/edit`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const error = await res.json().catch(() => null)
        throw new Error(error?.error || "Update failed")
      }

      return res.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-projects", "me"],
      })
    },
  })
}