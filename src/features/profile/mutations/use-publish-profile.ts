import { useMutation, useQueryClient } from "@tanstack/react-query"

export function usePublishProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/provider/me/publish`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || "Failed to publish profile")
      }

      return data
    },

    onSuccess: () => {
      // invalidate profile-related queries
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      })
    },
  })
}