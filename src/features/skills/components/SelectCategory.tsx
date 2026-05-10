import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategoriesContext } from './provider/CategoriesProvider'

type SelectCategoryProps = {
  onChange: (value: string) => void
  value: string
}

const SelectCategory = ({ onChange, value }: SelectCategoryProps) => {
  const data = useCategoriesContext()

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
      <SelectGroup id="form-input-skill-category">
        <SelectLabel>Categories</SelectLabel>
        {
          data.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))
        }
      </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectCategory