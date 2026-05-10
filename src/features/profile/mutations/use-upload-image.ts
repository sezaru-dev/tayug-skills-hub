import { useMutation } from "@tanstack/react-query"

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/provider/me/projects/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      return res.json() as Promise<{ secure_url: string, public_id: string }>
    },
  })
}