'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'

type Props = {
  onEdit: () => void
  onRequest: () => void
}

export default function SkillsActionsMenu({ onEdit, onRequest }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          Edit Skills
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onRequest}>
          Request New Skill
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}