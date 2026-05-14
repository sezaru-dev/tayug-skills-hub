"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import RenameSkillDialog from "@/features/skills/components/rename/RenameSkillDialog"
import ChangeCategoryDialog from "@/features/skills/components/change-category/ChangeCategoryDialog"
import { ChangeSkillStatusAlertDialog } from "@/features/skills/components/change-status/ChangeSkillStatusAlertDialog"
import { PermanentDeleteSkillAlertDialog } from "@/features/skills/components/delete/PermanentDeleteSkillAlertDialog"

export type RecentSkills = {
  skill: string
  category: string
  isActive: boolean
  createdAt: string
}

export const RecentSkillsColumns: ColumnDef<RecentSkills>[] = [

  {
    accessorKey: "skill",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Skill
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
        header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
            return isActive ? (
              <Badge
                variant="outline"
                className="border-blue-300 bg-blue-50 text-blue-700"
              >
                Active
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-muted text-muted-foreground"
              >
                Inactive
              </Badge>
            )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return (
        <time dateTime={date.toISOString()}>
          {date.toLocaleString("en-PH", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </time>
      );
    },
  },

]