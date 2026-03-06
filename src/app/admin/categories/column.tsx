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
import ToggleStatusDropdownMenuItem from "@/features/admin/categories/components/toggle-status-dropdownmenuitem"
import RenameCategoryDialog from "@/features/admin/categories/components/rename-category-dialog"
import { PermanentDeleteAlertDialog } from "@/features/admin/categories/components/permanent-delete-alert-dialog"

export type Category = {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  skills: string[]
}

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
    accessorKey: "skills",
    header: "Skills",
    cell: ({ row }) => {
      const skills = row.getValue("skills") as string[];
      if (!skills || skills.length === 0) {
        return <span className="text-gray-500">0</span>;
      }
      return  (skills.length);
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
          className="border-emerald-300 bg-emerald-50 text-emerald-700"
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
    accessorKey: "updatedAt",
    header: "Updated At",
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
      const skills = row.getValue("skills") as string[];
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

              <div className="max-h-64 overflow-y-auto space-y-2">
                {skills?.map((skill, index) => (
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
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenuSeparator />

          {/* rename category action */}
          <RenameCategoryDialog id={row.original.id} currentName={row.original.name} />


            <ToggleStatusDropdownMenuItem categoryId={id} isActive={isActive} />

            <PermanentDeleteAlertDialog id={row.original.id} categoryName={row.original.name} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]