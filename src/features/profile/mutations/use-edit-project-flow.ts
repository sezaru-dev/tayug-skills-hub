import { useUploadImage } from "./use-upload-image"
import { useDeleteImage } from "./use-delete-image"
import { useEditProject } from "./use-edit-project"

export function useEditProjectFlow() {
  const uploadImage = useUploadImage()
  const deleteImage = useDeleteImage()
  const editProject = useEditProject()

  const isPending =
    uploadImage.isPending ||
    deleteImage.isPending ||
    editProject.isPending

  const mutateAsync = async (data: {
    projectId: string
    imageFile?: File | null
    currentImagePublicId?: string | null
    currentImageUrl?: string | null
    title: string
    description: string
    liveUrl?: string
    skills: string[]
  }) => {
    let imageUrl = data.currentImageUrl ?? null
    let imagePublicId = data.currentImagePublicId ?? null

    // case 1: no new image → skip everything
    if (!data.imageFile) {
      return await editProject.mutateAsync({
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        liveUrl: data.liveUrl,
        skills: data.skills,
        imageUrl,
        imagePublicId,
      })
    }

    // case 2: new image exists → replace flow

    // 1. delete old image (if exists)
    if (imagePublicId) {
      await deleteImage.mutateAsync(imagePublicId)
    }

    // 2. upload new image
    const upload = await uploadImage.mutateAsync(data.imageFile)

    imageUrl = upload.secure_url
    imagePublicId = upload.public_id

    // 3. update project with new image
    return await editProject.mutateAsync({
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      liveUrl: data.liveUrl,
      skills: data.skills,
      imageUrl,
      imagePublicId,
    })
  }

  return {
    mutateAsync,
    isPending,
  }
}