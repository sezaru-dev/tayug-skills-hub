"use client"

import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

type SearchFilterProps = {
  placeholder?: string
  className?: string
  paramKey?: string
  delay?: number
}

export default function SearchFilter({
  placeholder,
  className,
  paramKey = "search",
  delay = 300,
}: SearchFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // local UI state (needed for debounce UX)
  const [value, setValue] = useState(
    () => searchParams.get(paramKey) ?? ""
  )

  useEffect(() => {
    setValue(searchParams.get(paramKey) ?? "")
  }, [searchParams, paramKey])

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(paramKey, value)
      } else {
        params.delete(paramKey)
      }

      router.push(`${pathname}?${params.toString()}`)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay, pathname, router, searchParams, paramKey])

  return (
    <Input
      placeholder={placeholder ?? "Search name or service..."}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`max-w-sm ${className ?? ""}`}
    />
  )
}