"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Skill } from "@/features/skills/type"
import RenameSkillDialog from "@/features/skills/components/rename/RenameSkillDialog"
import ChangeCategoryDialog from "@/features/skills/components/change-category/ChangeCategoryDialog"
import { ChangeSkillStatusAlertDialog } from "@/features/skills/components/change-status/ChangeSkillStatusAlertDialog"
import { PermanentDeleteSkillAlertDialog } from "@/features/skills/components/delete/PermanentDeleteSkillAlertDialog"

export const columns: ColumnDef<Skill>[] = [

  {
    accessorKey: "name",
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
    accessorKey: "category.name",
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
  accessorKey: "updatedAt",
  header: "Updated At",
  cell: ({ row }) => {
    const date = new Date(row.getValue("updatedAt") as string);
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
{
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <RenameSkillDialog id={row.original.id} currentName={row.original.name} categoryId={row.original.categoryId} />

            <ChangeCategoryDialog id={row.original.id}  name={row.original.name} currentCategoryId={row.original.categoryId} />

            <ChangeSkillStatusAlertDialog id={row.original.id} isActive={row.original.isActive} />
            <PermanentDeleteSkillAlertDialog id={row.original.id} categoryName={row.original.name} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]