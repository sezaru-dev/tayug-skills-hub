import { useMutation, useQueryClient } from "@tanstack/react-query"

type DeleteProjectInput = {
  projectId: string
}

type DeleteProjectResponse = {
  success: boolean
  deletedProjectId: string
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation<DeleteProjectResponse, Error, DeleteProjectInput>({
    mutationFn: async ({ projectId }) => {
      const res = await fetch(
        `/api/provider/me/projects/${projectId}`,
        {
          method: "DELETE",
        }
      )

      if (!res.ok) {
        const error = await res.json().catch(() => null)
        throw new Error(error?.error || "Failed to delete project")
      }

      return res.json()
    },

    onSuccess: (_, { projectId }) => {
      queryClient.setQueryData(
        ["provider-projects", "me"],
        (old: any[] | undefined) =>
          old?.filter((p) => p.id !== projectId) ?? []
      )
    },
  })
}