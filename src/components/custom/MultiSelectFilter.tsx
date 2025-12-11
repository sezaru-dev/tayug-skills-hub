"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Funnel } from "lucide-react"
/* import { Table } from "@tanstack/react-table"
import { capitalize } from "@/utils/capitalize" */

type MultiSelectFilterProps = { /* <TData> */
  /* table: Table<TData> */
  columnKey: string
  label?: string
  options?: string[]
}
export const skillGroups = [
  "Home Repair & Maintenance",
  "Cleaning & Sanitation",
  "Construction & Engineering",
  "Automotive & Transport",
  "Beauty & Personal Care",
  "Food & Catering",
  "Education & Tutoring",
  "Events & Creative Services",
  "Health & Medical Services",
  "Business & Professional Services",
  "Technology & IT",
  "Agriculture & Skilled Labor",
  "Logistics & Errands",
  "Tailoring & Custom Work",
  "Home & Lifestyle Services",
];




export function MultiSelectFilter({/* <TData> */
  /* table, */
  /* columnKey, */
  label = "Filter",
  options = skillGroups,
}: MultiSelectFilterProps) {/* <TData> */
  const [selected, setSelected] = useState<string[]>([])

  function toggleValue(value: string) {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]

    setSelected(updated)
/*     table.getColumn(columnKey)?.setFilterValue(
      updated.length ? updated : undefined
    ) */
  }

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Funnel className="h-4 w-4" />
          <span className="hidden sm:block ml-1">{label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full max-w-min p-2">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt}
                onSelect={() => toggleValue(opt)}
                className="flex items-center gap-2 capitalize text-nowrap"
              >
                <Checkbox
                  checked={selected.includes(opt)}
                  onCheckedChange={() => toggleValue(opt)}
                   className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                {opt}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
