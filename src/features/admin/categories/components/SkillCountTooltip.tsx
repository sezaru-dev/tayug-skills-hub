import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skill } from '../../skills/type'

type SkillCountTooltipProps = {
  children: React.ReactNode
  skills: Skill[]
}

const SkillCountTooltip = ({ children, skills }: SkillCountTooltipProps) => {
  const activeSkills = skills.filter(skill => skill.isActive === true)
  const inactiveSkills = skills.filter(skill => skill.isActive === false)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className='bg-gray-800 p-2 rounded-md shadow-lg' side='top'>
        <h6 className='text-sm font-medium mb-1'>Skill Summary</h6>
        <p>Active: {activeSkills.length}</p>
        <p>Inactive: {inactiveSkills.length}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default SkillCountTooltip