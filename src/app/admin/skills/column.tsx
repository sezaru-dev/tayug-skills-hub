"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export type Skill = {
  id: string
  name: string
  slug: string
  isActive: boolean
  category: string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return `${row.index + 1}.`
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
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
          variant="secondary"
          className="bg-blue-50 text-blue-800"
        >
          Active
        </Badge>

      ) : (
        <Badge variant="secondary" className="text-gray-500">Inactive</Badge>
      );
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const skills = row.getValue("skills") as string[];
      const isActive = true as Boolean
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


          <Dialog >
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                View Skills
              </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Home Repair & Maintenance</DialogTitle>
                <DialogDescription>
                  Skills under this category
                </DialogDescription>
              </DialogHeader>

              <Input placeholder="Search skills..." className="mb-3" />

              {/* <div className="max-h-64 overflow-y-auto space-y-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-md px-3 py-2"
                  >
                    <span>{skill}</span>
                    <Badge variant={isActive ? "secondary" : "outline"}>
                      {isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                ))}
              </div> */}
            </DialogContent>
          </Dialog>

            <DropdownMenuSeparator />
            <DropdownMenuItem>Add Skill</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Deactivate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]