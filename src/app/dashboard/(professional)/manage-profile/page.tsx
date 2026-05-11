'use client'

import ProfileHeader from "@/features/profile/components/header/ProfileHeader"
import AboutSection from "@/features/profile/components/about/AboutSection"
import SkillsSection from "@/features/profile/components/skills/SkillsSection"
import ProjectSection from "@/features/profile/components/projects/ProjectSection"
import ContactSection from "@/features/profile/components/contact/ContactSection"
import { useGetProfileById } from "@/features/profile/queries/use-get-profile-by-id"
import { useGetUserSkills } from "@/features/profile/queries/use-get-user-skills"
import { useGetProjectsByUserId } from "@/features/profile/queries/use-get-projects-by-userid"
import ProfileAlert from "@/features/profile/components/ProfileAlerts"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function ManageProfilePage() {
  const profile = useGetProfileById()
  const skills = useGetUserSkills()
  const projects = useGetProjectsByUserId()

  const data = profile.data
  const isLoading = profile.isLoading || skills.isLoading || projects.isLoading
  const error = profile.error || skills.error || projects.error

  const isProfileComplete =
    Boolean(data?.fullname) &&
    Boolean(data?.headline) &&
    Boolean(data?.about) &&
    Boolean(data?.barangay) &&
    Boolean(data?.phoneNumber) &&
    (skills.data?.length ?? 0) >= 1 &&
    (projects.data?.length ?? 0) >= 1

  return (
    <main className="flex-1 p-4 md:p-8 space-y-5 max-w-5xl mx-auto w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Manage Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Update your professional information, showcase your skills, and keep your profile current.
          </p>
        </div>
      </div>

      {/* Alerts */}
      {!isLoading && !error && (
        <ProfileAlert
          isProfileComplete={isProfileComplete}
          isPublished={data?.isPublished ?? false}
        />
      )}

      {/* Error (non-blocking) */}
      {error && (
        <Alert className="border-red-200 bg-red-50 text-red-700 ">
          <AlertDescription className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4"/>
            {(error as Error).message}
          </AlertDescription>
        </Alert>
      )}

      {/* Sections */}
      <div className="space-y-8 sm:space-y-10">
        <ProfileHeader profile={data} isLoading={profile.isLoading} />
        <AboutSection data={data} isLoading={profile.isLoading} />
        <SkillsSection data={skills.data} isUserSkillsLoading={skills.isLoading} />
        <ProjectSection data={projects.data} isLoading={projects.isLoading}/>
        <ContactSection phoneNumber={data?.phoneNumber ?? null} isLoading={profile.isLoading} />
      </div>
    </main>
  )
}