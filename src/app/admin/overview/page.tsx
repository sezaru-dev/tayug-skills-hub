export const dynamic = "force-dynamic"
import React from 'react'
import { StatCard } from './StatCard'
import { ProviderDiscoveryRepository } from '@/features/provider-discovery/provider-discovery.repository'
import { CategoryRepository } from '@/features/categories/data/category-repository'
import { SkillRepository } from '@/features/skills/skill-repository'
import { DataTable } from './recent-providers/data-table'
import { columns } from './recent-providers/column'
import { RecentSkillsDataTable } from './recent-skills/data-table'
import { RecentSkillsColumns } from './recent-skills/column'


export default async function OverviewPage() {
  const totalProviders = await ProviderDiscoveryRepository.getTotalProviders()
  const totalCategories = await CategoryRepository.getTotalCategories()
  const totalTotal = await SkillRepository.getTotalSkills()
  const totalPublished = await ProviderDiscoveryRepository.getTotalPublishedProviders()
  const recentProviders = await ProviderDiscoveryRepository.getRecentProviders()
  const recentSkills = await SkillRepository.recentSkills()

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground text-sm">
            Create, update, and organize skill categories to keep the platform structured and user-friendly.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title='Total Providers' value={totalProviders}/>
        <StatCard title='Total Categories' value={totalCategories}/>
        <StatCard title='Total Skills' value={totalTotal}/>
        <StatCard title='Total Pubished Providers' value={totalPublished}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable
          columns={columns}
          data={recentProviders ?? []}
        />
        <RecentSkillsDataTable
          columns={RecentSkillsColumns}
          data={recentSkills ?? []}
        />
      </div>
    </main>
  )
}
