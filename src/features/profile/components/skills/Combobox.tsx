'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { SkillWithCategory } from './EditSkillsDialog'

type ComboboxProps = {
  options: SkillWithCategory[]
  value: string[] // selected IDs
  onChange: (value: string[]) => void
}

type GroupedSkills = {
  category: string
  skills: SkillWithCategory[]
}

type FlatItem = {
  id: string
  name: string
  category: string
}

const Combobox = ({ options, value, onChange }: ComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // selected objects
  const selected = useMemo(
    () => options.filter(opt => value.includes(opt.id)),
    [options, value]
  )

  // filtered options
  const filtered = useMemo(() => {
    return options.filter(
      (opt) =>
        opt.name.toLowerCase().includes(query.toLowerCase()) &&
        !value.includes(opt.id)
    )
  }, [options, query, value])

  // grouped
  const grouped: GroupedSkills[] = useMemo(() => {
    const map = new Map<string, SkillWithCategory[]>()

    for (const skill of filtered) {
      const cat = skill.category.name
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(skill)
    }

    return Array.from(map.entries())
      .map(([category, skills]) => ({
        category,
        skills: skills.sort((a, b) => a.name.localeCompare(b.name))
      }))
      .sort((a, b) => a.category.localeCompare(b.category))
  }, [filtered])

  // FLATTEN for keyboard nav
  const flatList: FlatItem[] = useMemo(() => {
    return grouped.flatMap(group =>
      group.skills.map(skill => ({
        id: skill.id,
        name: skill.name,
        category: group.category
      }))
    )
  }, [grouped])

  // select
  const selectItem = (item: SkillWithCategory) => {
    onChange([...value, item.id])
    setQuery("")
    setOpen(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  // remove
  const removeItem = (id: string) => {
    onChange(value.filter(v => v !== id))
  }

  // reset
  const resetItem = () => {
    onChange([])
    setQuery("")
    setActiveIndex(-1)
  }

  // click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // keyboard control
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex(prev =>
          prev < flatList.length - 1 ? prev + 1 : 0
        )
        break

      case "ArrowUp":
        e.preventDefault()
        setActiveIndex(prev =>
          prev > 0 ? prev - 1 : flatList.length - 1
        )
        break

      case "Enter":
        e.preventDefault()
        const item = flatList[activeIndex]
        if (item) {
          const fullItem = options.find(o => o.id === item.id)
          if (fullItem) selectItem(fullItem)
        }
        break

      case "Escape":
        setOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  return (
    <div className="relative w-full" ref={containerRef}>

      {/* placeholder */}
      {value.length === 0 && query === "" && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
          Select skills
        </span>
      )}

      {/* input box */}
      <div
        className="w-full flex flex-wrap items-center gap-2 border rounded-md pl-2 py-2 min-h-[44px] pr-12 cursor-text relative"
        onClick={() => {
          inputRef.current?.focus()
          setOpen(true)
        }}
      >
        {/* selected */}
        {selected.map(item => (
          <Badge
            key={item.id}
            variant="outline"
            className="px-2 py-1 text-xs bg-gray-100 flex items-center gap-1 font-medium"
          >
            {item.name}

            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation()
                removeItem(item.id)
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}

        {/* input */}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIndex(0)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
        />

        {/* reset */}
        {value.length > 0 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-6 w-6"
              onClick={resetItem}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* dropdown */}
      {open && (
        <div className="absolute top-full mt-2 left-0 w-full z-50 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">

          {grouped.length === 0 ? (
            <div className="p-2 text-sm text-gray-500">
              No results found.
            </div>
          ) : (
            grouped.map(group => (
              <div key={group.category}>

                {/* category */}
                <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 sticky top-0 border-t first:border-t-0">
                  {group.category}
                </div>

                {/* items */}
                {group.skills.map(item => {
                  const index = flatList.findIndex(f => f.id === item.id)
                  const isActive = index === activeIndex

                  return (
                    <div
                      key={item.id}
                      onClick={() => selectItem(item)}
                      className={`px-3 py-2 cursor-pointer text-sm ${
                        isActive ? "bg-gray-200" : "hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Combobox