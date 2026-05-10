import { useMutation, useQueryClient } from "@tanstack/react-query"

type RemoveProviderPayload = {
  providerId: string
}

type RemovedProviderResponse = {
  message: string
}

export function useUnsaveProvider() {
  const queryClient = useQueryClient()

  return useMutation<RemovedProviderResponse, Error, RemoveProviderPayload>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/saved-providers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to remove saved provider")

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