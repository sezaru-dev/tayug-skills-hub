'use client'

import { useGetAdminServiceProviders } from "@/features/provider-discovery/queries/use-get-admin-providers"
import { DataTable } from "./data-table"
import { columns } from "./column"

export default function AdminServiceProviderPage() {
  const { data, error } = useGetAdminServiceProviders()

  if (error) {
    return <div className="text-red-600">{(error as Error).message}</div>
  }

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 w-full">

      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Service Providers
        </h1>

        <p className="text-sm text-muted-foreground max-w-xl">
          Manage and review registered service providers, including their profiles, publication status, and submitted content.
        </p>
      </header>

      <DataTable
        columns={columns}
        data={data ?? []}
      />
    </main>
  )
}