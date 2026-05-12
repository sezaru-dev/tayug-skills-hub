"use client"

import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ActiveSkills, Skill } from "../sections/Hero"

const SearchBarSuggestions = ({
  query,
  onSelect,
  skills,
}: {
  query: string
  onSelect: (value: string) => void
  skills: Skill[]
}) => {
  const filtered = skills.filter((skill) =>
    skill.name.toLowerCase().includes(query.toLowerCase())
  )

  if (!query.trim() || filtered.length === 0) return null

  return (
    <div className="absolute top-full left-0 mt-2 w-full rounded-xl border bg-black/10 backdrop-blur-md shadow-lg overflow-hidden z-50">
      <ul className="max-h-56 overflow-y-auto">
        {filtered.map((skill) => (
          <li
            key={skill.id}
            onClick={() => onSelect(skill.name)}
            className="px-4 py-2 text-sm text-left text-white hover:bg-white/20 cursor-pointer transition"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export type SearchBarProps = { placeholder?: string } & ActiveSkills

export default function SearchBar({
  placeholder = "Search services...",
  activeSkills,
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // build query params safely
  const params = new URLSearchParams()

  if (query.trim()) {
    params.set("search", query)
  }

  const searchHref = `/browse-providers?${params.toString()}`

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto relative">
      {/* input group */}
      <div className="flex h-12 items-center rounded-xl border bg-white/5 backdrop-blur-md overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="h-full border-0 bg-transparent focus-visible:ring-0 px-4 text-base text-white"
        />

        {query.trim() ? (
          <Link
            href={searchHref}
            className="flex items-center justify-center h-full px-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Search
          </Link>
        ) : (
          <span className="flex items-center justify-center h-full px-6 bg-blue-600/50 text-white cursor-not-allowed">
            Search
          </span>
        )}
      </div>

      {/* suggestions */}
      {open && (
        <SearchBarSuggestions
          query={query}
          skills={activeSkills}
          onSelect={(value) => {
            setQuery(value)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}