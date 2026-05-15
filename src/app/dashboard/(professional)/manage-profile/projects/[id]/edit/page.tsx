export const dynamic = "force-dynamic"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

import { ProfileRepository } from "@/features/profile/profile-repository"
import ProjectEditForm from "@/features/profile/components/projects/ProjectEditForm"

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return <div>Unauthorized</div>
  }

  const project = await ProfileRepository.getProjectByIdAndUserId(
    params.id,
    session.user.id
  )

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <main className="flex-1 p-4 md:p-8 space-y-6 max-w-6xl mx-auto bg-white w-full">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Edit project
          </h1>
          <p className="text-muted-foreground text-sm">
            Update your project details, refine its description, and keep your portfolio up to date.
          </p>
        </div>
      </div>
      <ProjectEditForm initialData={project} />
    </main>
  )
}




