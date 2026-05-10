import { useMutation } from "@tanstack/react-query"

export function useDeleteImage() {
  return useMutation({
    mutationFn: async (public_id: string) => {
      const res = await fetch("/api/provider/me/projects/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => null)
        throw new Error(error?.error || "Image deletion failed")
      }

      return res.json() as Promise<{
        message: string
        result: "ok" | "not found"
      }>
    },
  })
}