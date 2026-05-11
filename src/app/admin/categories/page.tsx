'use client'

import LoadingSkeleton from "@/components/custom/LoadingSkeleton"
import { columns } from "./column"
import { DataTable } from "./data-table"
import { useCategories } from "@/features/categories/queries/use-categories"
import ErrorUI from "@/features/categories/components/ErrorUI"

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategories()

  if (isLoading) return <LoadingSkeleton/>
  if (error) return <ErrorUI error={error} />

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )
}
