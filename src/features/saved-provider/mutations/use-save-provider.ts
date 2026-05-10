import { useMutation, useQueryClient } from "@tanstack/react-query"

type SaveProviderPayload = {
  providerId: string
}

type SavedProvider = {
  id: string
  userId: string
  providerId: string
  createdAt: string
}

export function useSaveProvider() {
  const queryClient = useQueryClient()

  return useMutation<SavedProvider, Error, SaveProviderPayload>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/saved-providers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to save provider")

      return res.json()
    },

    onSuccess: () => {
      // refresh saved providers + browse state
      queryClient.invalidateQueries({
        queryKey: ["saved-providers"],
      })
      
      queryClient.invalidateQueries({
        queryKey: ["saved-provider-ids"],
      })

      queryClient.invalidateQueries({
        queryKey: ["providers"],
      })
    },
  })
}