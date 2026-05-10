"use client"

import React, { useEffect, useState } from "react"
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
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ActiveCategory } from "@/features/categories/queries/use-get-active-categories"


type MultiSelectFilterProps = {
  label?: string
  options?: ActiveCategory[]
  paramKey?: string // e.g. "categories"
}

export function MultiSelectFilter({
  label = "Filter",
  options,
  paramKey = "categories",
}: MultiSelectFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // 👇 hydrate from URL
  const [selected, setSelected] = useState<string[]>(() => {
    const param = searchParams.get(paramKey)
    return param ? param.split(",") : []
  })

  // 👇 keep UI in sync when URL changes (back/forward nav)
  useEffect(() => {
    const param = searchParams.get(paramKey)
    setSelected(param ? param.split(",") : [])
  }, [searchParams, paramKey])

  function updateURL(values: string[]) {
    const params = new URLSearchParams(searchParams.toString())

    if (values.length > 0) {
      params.set(paramKey, values.join(","))
    } else {
      params.delete(paramKey)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  function toggleValue(value: string) {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]

    setSelected(updated)
    updateURL(updated)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Funnel className="h-4 w-4" />
          <span className="hidden sm:block ml-1">
            {label}
            {selected.length > 0 && ` (${selected.length})`}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full max-w-min p-2">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandGroup>
            {options?.map((category) => (
              <CommandItem
                key={category.slug}
                onSelect={() => toggleValue(category.slug)}
                className="flex items-center gap-2 capitalize text-nowrap"
              >
                <Checkbox
                  checked={selected.includes(category.slug)}
                  onCheckedChange={() => toggleValue(category.slug)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}