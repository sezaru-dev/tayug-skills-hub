import React from "react"
import SearchBar from "../custom/SearchBar"
import Link from "next/link"
import Image from "next/image"

export type Skill = {
  id: string
  name: string
  slug: string
}

export type ActiveSkills = {
  activeSkills: Skill[]
}

export default function Hero({ activeSkills }: ActiveSkills) {
  function getRandomSkills(activeSkills: Skill[], count = 8) {
    const shuffled = [...activeSkills].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  const randomSkills = getRandomSkills(activeSkills, 8)

  return (
    <section className="relative max-h-screen overflow-hidden">
      {/* background image */}
      <Image
        src="/hero-section-background.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover object-top md:object-center"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-gray-950/70" />

      <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative z-10 mt-12">

        {/* HERO CONTENT WRAPPER */}
        <div className="flex flex-col items-center space-y-6">

          {/* Highlight Tag */}
          <div className="text-sm px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white">
            Discover Skilled Local Talent in Tayug
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium max-w-4xl text-white leading-tight">
            Find Trusted Local Professionals for Every Need
          </h1>

          {/* Subtext */}
          <p className="sm:text-lg text-gray-200 max-w-2xl leading-relaxed">
            Discover trusted local talent in Tayug for home services, skilled trades, creative work, and more.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl pt-2">
            <SearchBar
              placeholder="What skills are you looking for?"
              activeSkills={activeSkills}
            />
          </div>

        </div>

        {/* SKILLS (separated visual section) */}
        <ul className="flex flex-wrap items-center justify-center gap-3 mt-14 max-w-3xl">
          {randomSkills.map((skill) => {
            const params = new URLSearchParams()
            params.set("search", skill.name)

            const href = `/browse-providers?${params.toString()}`

            return (
              <li key={skill.id}>
                <Link
                  href={href}
                  className="
                    inline-flex
                    px-4 py-2 rounded-full
                    bg-white/10
                    border border-white/10
                    backdrop-blur-md
                    text-sm text-white
                    hover:bg-white/20
                    transition
                  "
                >
                  {skill.name}
                </Link>
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}
