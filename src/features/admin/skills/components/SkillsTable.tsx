"use client"

import { columns } from "@/app/admin/skills/column"
import { DataTable } from "@/app/admin/skills/data-table"
import { useGetSkills } from "../queries/use-get-skills"

export default function SkillsTable() {
  const { data, isLoading, error } = useGetSkills({
    params: {
      sortBy: "updatedAt",
      sortOrder: "desc",
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <div className="text-red-600">{(error as Error).message}</div>

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}