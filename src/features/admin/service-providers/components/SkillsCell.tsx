"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Skill } from "@/features/profile/types"

type Props = {
  skills: Pick<Skill, 'id' | 'name'>[]
}

export function SkillsCell({ skills }: Props) {
  const visible = skills.slice(0, 2)
  const remaining = skills.length - 2

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {visible.map((skill) => (
        <span
          key={skill.id}
          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
        >
          {skill.name}
        </span>
      ))}

      {remaining > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs text-muted-foreground cursor-pointer">
              +{remaining} more
            </span>
          </TooltipTrigger>

          <TooltipContent>
            <div className="flex flex-col gap-1">
              {skills.slice(2).map((skill) => (
                <span key={skill.id} className="text-xs">
                  {skill.name}
                </span>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}