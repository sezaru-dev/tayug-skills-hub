export const dynamic = "force-dynamic"
import React from "react";
import PublicAboutSection from "@/features/profile/components/about/PublicAboutSection";
import PublicContactSection from "@/features/profile/components/contact/PublicContactSection";
import PublicProfileHeader from "@/features/profile/components/header/PublicProfileHeader";
import PublicProjectSection from "@/features/profile/components/projects/PublicProjectSection";
import PublicSkillsSection from "@/features/profile/components/skills/PublicSkillsSection";
import { ProviderDiscoveryRepository } from "@/features/provider-discovery/provider-discovery.repository";
import { ProfileType } from "@/features/service-provider.types";


export default async function PublicProfilePage({params}: {params: { id: string }}) {
  const user = await ProviderDiscoveryRepository.getProfileById(params.id)

  if (!user) {
    return <div>User not found</div>
  }
  const profileData = {
    fullname: user.profile?.fullname ?? "",
    headline: user.profile?.headline ?? "",
    barangay: user.profile?.barangay as ProfileType["barangay"],

  }
  const skills = user.providerSkills.map((ps) => ({id: ps.skill.id,name: ps.skill.name}))
  const publicProjects = user.projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    liveUrl: project.liveUrl,
    imageUrl: project.imageUrl,

    skills: project.skills.map((item) => ({
      id: item.skill.id,
      name: item.skill.name,
    })),
  }))
  
  return (
    <main className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 py-10 sm:py-12 space-y-8 sm:space-y-10">
      <PublicProfileHeader profile={profileData} />
      <PublicAboutSection about={user.profile?.about ?? ""} />
      <PublicSkillsSection data={skills}/>
      <PublicProjectSection data={publicProjects} />
      <PublicContactSection phoneNumber={user.profile?.phoneNumber ?? ""} />
    </main>
  );
}