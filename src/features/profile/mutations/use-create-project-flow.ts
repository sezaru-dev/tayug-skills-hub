import { useUploadImage } from "./use-upload-image"
import { useCreateProject } from "./use-create-project"

export function useCreateProjectFlow() {
  const uploadImage = useUploadImage()
  const createProject = useCreateProject()

  const isPending =
    uploadImage.isPending || createProject.isPending

  const mutateAsync = async (data: {
    imageFile: File
    title: string
    description: string
    liveUrl?: string
    skills: string[]
  }) => {
    // 1. upload image first
    const upload = await uploadImage.mutateAsync(data.imageFile)

    // 2. create project using upload result
    return await createProject.mutateAsync({
      title: data.title,
      description: data.description,
      liveUrl: data.liveUrl,
      skills: data.skills,
      imageUrl: upload.secure_url,
      imagePublicId: upload.public_id,
    })
  }

  return {
    mutateAsync,
    isPending,
  }
}