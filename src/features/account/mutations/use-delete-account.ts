import { useMutation, useQueryClient } from "@tanstack/react-query"
import type {
  DeleteAccountInput,
  DeleteAccountResponse,
} from "../types"

export function useDeleteAccount() {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteAccountResponse,
    Error,
    DeleteAccountInput
  >({
    mutationFn: async ({ password }) => {
      const res = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await res.json().catch(() => ({}))

      console.log(data);
      

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account")
      }

      return data
    },

    onSuccess: async () => {
      // clear react-query cache
      queryClient.clear()

    },
  })
}