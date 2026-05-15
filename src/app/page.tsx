export const dynamic = "force-dynamic"
import CTASection from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import HowThePlatformWorks from "@/components/sections/HowThePlatformWorks";
import WhatMakesUsDifferent from "@/components/sections/WhatMakesUsDifferent";
import { SkillRepository } from "@/features/skills/skill-repository";

export default async function Home() {
  const activeSkills = await SkillRepository.getActiveSkillsNameId()

  return (
    <div>
      <Hero activeSkills={activeSkills}/>
      <HowThePlatformWorks/>
      <WhatMakesUsDifferent/>
      <CTASection/>
    </div>
  );
}
