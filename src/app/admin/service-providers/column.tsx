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
import { AdminServiceProviders } from "@/features/provider-discovery/queries/use-get-admin-providers"
import { SkillsCell } from "@/features/admin/service-providers/components/SkillsCell"
import Link from "next/link"

export const columns: ColumnDef<AdminServiceProviders>[] = [

  {
    accessorKey: "fullname",
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
    accessorKey: "email",
        header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
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
    accessorKey: "skills",
    header: "Skills",
    cell: ({ row }) => {
      const skills = row.original.skills

      return <SkillsCell skills={skills} />
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

            {
              row.original.isPublished ?
              <DropdownMenuItem asChild>
                <Link href={`/admin/service-providers/${row.original.id}`}>
                  View profile
                </Link>
              </DropdownMenuItem> : ''

            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]