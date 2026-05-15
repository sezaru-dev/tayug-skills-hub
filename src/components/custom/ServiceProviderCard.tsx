"use client"

import React from "react"
import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Skill = {
  id: string
  name: string
  category?: string
}

type ServiceProviderCardProps = {
  id: string
  fullname: string
  headline: string
  barangay: string
  skills: Skill[]
  onViewProfile?: (id: string) => void
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  id,
  fullname,
  headline,
  barangay,
  skills,
}) => {


  const initials = fullname
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const visibleSkills = skills.slice(0, 3)

  return (
    <Card className="flex flex-col p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all rounded-xl h-full">

      {/* Top Section */}
      <div className="flex gap-4 items-start">

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-100 border shrink-0">
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">

          {/* Name */}
          <h3 className="text-sm font-semibold truncate">
            {fullname}
          </h3>

          {/* Headline (limit but no fixed height) */}
          <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug line-clamp-2">
            {headline}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{barangay}</span>
          </div>
        </div>
      </div>

      {/* CTA pinned bottom */}
      <div className="mt-auto pt-4">
        <Link href={`/browse-providers/${id}`} className="block">
          <Button className="w-full text-sm font-medium" size="sm">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  )
}