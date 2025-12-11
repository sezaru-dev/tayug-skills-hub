import React from 'react'
import { Input } from '../ui/input'

type SearchFilterProps = {
  value?: string
  onChange?: (event: string) => void
  cName?: string
  placeholder?: string
}

export default function SearchFilter({value, cName, placeholder}: SearchFilterProps) {
  return (
    <Input
      placeholder={`${placeholder ?? "Search name or service..." }`}
      value={value}
      /* onChange={(event) => onChange(event.target.value) } */
      className={`max-w-sm ${cName}`}
    />
  )
}
