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
import { SkillsCell } from "@/features/admin/service-providers/components/SkillsCell"
import Link from "next/link"
import { Barangay } from "@/features/service-provider.types"


export type RecentProviders = {
  id: string
  name: string
  fullname: string |undefined
  email: string
  barangay: string
  isPublished: boolean | undefined
  createdAt: string
}

export const columns: ColumnDef<RecentProviders>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "barangay",
        header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Barangay
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "isPublished",
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
      const isPublished = row.getValue("isPublished") as boolean;
            return isPublished ? (
              <Badge
                variant="outline"
                className="border-blue-300 bg-blue-50 text-blue-700"
              >
                Published
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-muted text-muted-foreground"
              >
                Unpublished
              </Badge>
            )
    },
  },

  {
    accessorKey: "createdAt",
    header: "Joined",
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