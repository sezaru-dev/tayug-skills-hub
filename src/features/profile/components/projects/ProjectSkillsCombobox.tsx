'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { SkillWithCategory } from '../skills/EditSkillsDialog'

type Props = {
  options: SkillWithCategory[]
  value: string[]
  onChange: (value: string[]) => void
  onBlur?: () => void
  disabled?: boolean
}

type FlatItem = {
  id: string
  name: string
  category: string
}

const ProjectSkillsCombobox = ({
  options,
  value,
  onChange,
  onBlur,
  disabled
}: Props) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = useMemo(
    () => options.filter(opt => value.includes(opt.id)),
    [options, value]
  )

  const filtered = useMemo(() => {
    return options.filter(
      (opt) =>
        opt.name.toLowerCase().includes(query.toLowerCase()) &&
        !value.includes(opt.id)
    )
  }, [options, query, value])

  const flatList: FlatItem[] = useMemo(() => {
    return filtered.map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category.name
    }))
  }, [filtered])

  const selectItem = (item: SkillWithCategory) => {
    const next = [...value, item.id]
    onChange(next)
    setQuery("")
    setOpen(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const removeItem = (id: string) => {
    onChange(value.filter(v => v !== id))
  }

  const resetItem = () => {
    onChange([])
    setQuery("")
    setActiveIndex(-1)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
        onBlur?.()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onBlur])

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

  if (disabled) {
    return (
      <div className="w-full border rounded-md px-3 py-2 text-sm text-gray-400">
        Disabled
      </div>
    )
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

          {flatList.length === 0 ? (
            <div className="p-2 text-sm text-gray-500">
              No results found.
            </div>
          ) : (
            flatList.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    const fullItem = options.find(o => o.id === item.id)
                    if (fullItem) selectItem(fullItem)
                  }}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectSkillsCombobox