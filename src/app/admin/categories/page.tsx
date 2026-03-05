'use client'

import { columns } from "./column"
import { DataTable } from "./data-table"
import { useCategories } from "@/features/admin/categories/queries/use-categories"

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategories()

  if (isLoading) return <p>Loading...</p>
  if (error) return <div className="text-red-600">{(error as Error).message}</div>

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )
}
