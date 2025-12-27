'use client'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import Link from "next/link"


export type ProviderPreview = {
  id: string
  displayName: string
  avatarUrl?: string | null
}

export type RecentlyViewedItem = {
  provider: ProviderPreview
  viewedAt: Date
}
export default function Page() {

const recentlyViewed: RecentlyViewedItem[] = [
  {
    provider: { id: "prov_1", displayName: "Juan Dela Cruz", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    provider: { id: "prov_2", displayName: "Maria Santos", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    provider: { id: "prov_3", displayName: "Pedro Reyes", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    provider: { id: "prov_4", displayName: "Ana Lopez", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    provider: { id: "prov_5", displayName: "Carlos Mendoza", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    provider: { id: "prov_6", displayName: "Luisa Ramirez", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
  },
  {
    provider: { id: "prov_7", displayName: "Miguel Torres", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 200), // 3 hours 20 minutes ago
  },
  {
    provider: { id: "prov_8", displayName: "Sofia Cruz", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
  },
  {
    provider: { id: "prov_9", displayName: "Ricardo Salazar", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 720), // 12 hours ago
  },
  {
    provider: { id: "prov_10", displayName: "Isabel Vega", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 900), // 15 hours ago
  },
  {
    provider: { id: "prov_11", displayName: "Fernando Luna", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 1440), // 1 day ago
  },
  {
    provider: { id: "prov_12", displayName: "Gabriela Rios", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 2880), // 2 days ago
  },
  {
    provider: { id: "prov_13", displayName: "Diego Flores", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 4320), // 3 days ago
  },
  {
    provider: { id: "prov_14", displayName: "Camila Ortega", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 5760), // 4 days ago
  },
  {
    provider: { id: "prov_15", displayName: "Jorge Morales", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 7200), // 5 days ago
  },
  {
    provider: { id: "prov_16", displayName: "Valentina Perez", avatarUrl: null },
    viewedAt: new Date(Date.now() - 1000 * 60 * 8640), // 6 days ago
  },
];

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`

  return `${Math.floor(seconds / 86400)}d ago`
}

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">List of recently viewed providers</h1>
          <p className="text-muted-foreground text-sm">
            Quickly revisit service providers you’ve recently explored for easy access.
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-4 py-4">
        {/*  */}
        <article>
          <header className="mb-2"><h3 className="font-medium text-xl">Flow</h3></header>
          <ul>
            <li>Visit Profile</li>
            <li>Check login</li>
            <li>Check userId & providerId exists in the record</li>
            <li>if exists, update the timestamp, it not insert a new data with current timestamp</li>
            <li>(optional) Trim to last N if &gt; 10</li>
          </ul>
        </article>
      </div>



        <Card className="space-y-3">
          {recentlyViewed.map((item) => (
            <Link
              key={item.provider.id}
              href={`/providers/${item.provider.id}`}
              className="flex items-center gap-4 rounded-md p-2 hover:bg-muted transition"
            >
              <Avatar>
                <AvatarFallback className="text-blue-600">
                  {item.provider.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="font-medium">{item.provider.displayName}</p>
                <p className="text-xs text-muted-foreground">
                  Viewed {timeAgo(item.viewedAt)} ago
                </p>
              </div>
            </Link>
          ))}
        </Card>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        
      </div>
    </main>
  )
}
