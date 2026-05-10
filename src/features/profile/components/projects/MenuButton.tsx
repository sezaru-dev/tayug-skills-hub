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
import Link from 'next/link'
import { DeleteProjectAlertDialog } from './DeleteProjectAlertDialog'

type Props = {
  id: string

}

export default function MenuButton({ id }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 z-20"
          aria-label="Project options"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/manage-profile/projects/${id}/edit`}>
            Edit
          </Link>
        </DropdownMenuItem>

        <DeleteProjectAlertDialog projectId={id}/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}