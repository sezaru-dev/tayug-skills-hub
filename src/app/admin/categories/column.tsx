"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import RenameCategoryDialog from "@/features/admin/categories/components/rename-category-dialog"
import { PermanentDeleteAlertDialog } from "@/features/admin/categories/components/permanent-delete-alert-dialog"
import ViewSkillsDialog from "@/features/admin/categories/components/view-skills-dialog"
import { Category } from "@/features/admin/categories/types"
import { ChangeCategoryStatusAlertDialog } from "@/features/admin/categories/components/change-status/ChangeCategoryStatusAlertDialog"
import SkillCountTooltip from "@/features/admin/categories/components/SkillCountTooltip"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
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
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("name") as string}</span>
    }
  },
  {
    id: "skills",
    header: "Skills",
    accessorFn: (row: Category) => row.skills ?? [], // always return array
    cell: ({ getValue }) => {
      const skills = getValue<Category["skills"]>() ?? [] // fallback to empty array
      return skills.length === 0
        ? <span className="text-gray-500">0</span>
        : <SkillCountTooltip skills={skills}><span className="cursor-pointer">{skills.length}</span></SkillCountTooltip>
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UpdatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt") as string);
      return (
        <time dateTime={date.toISOString()} className="text-nowrap">
          {`${date.toLocaleDateString("en-PH", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Manila",
          })} · ${date.toLocaleTimeString("en-PH", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Manila",
          })}`}
        </time>
      );
    },
  },
  
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id
      const isActive = row.getValue("isActive") as boolean;

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

            {/* view skills action */}
            <ViewSkillsDialog category={row.original.name} skills={row.original.skills} />

            <DropdownMenuSeparator />

            {/* rename category action */}
            <RenameCategoryDialog id={row.original.id} currentName={row.original.name} />

            {/* change category status action */}
            <ChangeCategoryStatusAlertDialog id={id} isActive={isActive} />

            {/* permanent delete category action */}
            {row.original.skills?.length === 0 && (
              <PermanentDeleteAlertDialog id={row.original.id} categoryName={row.original.name} />
            )}

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]