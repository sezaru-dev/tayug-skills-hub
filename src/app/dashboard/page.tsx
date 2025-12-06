import { AppSidebar } from "@/components/app-sidebar"
import { MultiSelectFilter } from "@/components/custom/MultiSelectFilter"
import SearchFilter from "@/components/custom/SearchFilter"
import { ServiceProviderCard } from "@/components/custom/ServiceProviderCard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { MessageCircle } from "lucide-react"

export default function Page() {
 const providers = [
  {
    id: "1",
    name: "Jane Doe",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: ["Plumbing", "Repair", "Maintenance"],
    location: "Tayug",
  },
  {
    id: "2",
    name: "John Smith",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["Web Development", "Front-end Development", "Data Encoding"],
    location: "Brgy. A, Tayug",
  },
  {
    id: "3",
    name: "Maria Santos",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    skills: ["Carpentry", "Furniture", "Woodworking"],
    location: "San Jose",
  },
  {
    id: "4",
    name: "Carlos Reyes",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    skills: ["Electrician", "Wiring", "Maintenance"],
    location: "Bayambang",
  },
  {
    id: "5",
    name: "Angela Cruz",
    avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    skills: ["Graphic Design", "Branding", "Illustration"],
    location: "Rosales",
  },
  {
    id: "6",
    name: "Michael Tan",
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    skills: ["Plumbing", "Installation", "Repair"],
    location: "Lingayen",
  },
  {
    id: "7",
    name: "Sophia Lim",
    avatarUrl: "https://randomuser.me/api/portraits/women/34.jpg",
    skills: ["Content Writing", "SEO", "Blogging"],
    location: "Dagupan",
  },
  {
    id: "8",
    name: "David Santos",
    avatarUrl: "https://randomuser.me/api/portraits/men/28.jpg",
    skills: ["Carpentry", "Furniture", "Woodworking"],
    location: "Urdaneta",
  },
  {
    id: "9",
    name: "Maria Lopez",
    avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    skills: ["Web Development", "Front-end Development", "UI Design"],
    location: "Tayug",
  },
  {
    id: "10",
    name: "Kevin Ramos",
    avatarUrl: "https://randomuser.me/api/portraits/men/36.jpg",
    skills: ["Electrician", "Installation", "Repair"],
    location: "San Carlos",
  },
  {
    id: "11",
    name: "Isabella Cruz",
    avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
    skills: ["Photography", "Videography", "Photo Editing"],
    location: "Mabini",
  },
  {
    id: "12",
    name: "Ryan Tan",
    avatarUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    skills: ["Web Development", "Full-stack Development", "UI/UX"],
    location: "Alaminos",
  },
];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Browse Service Provider</h1>
          <p className="text-muted-foreground text-sm">
            Explore available service providers, view their profiles, and connect with the right skills for your needs.
          </p>
        </div>
      </div>
        <div className="flex items-center gap-4 py-4">
          <SearchFilter />
          <MultiSelectFilter
            columnKey="category"
            label="Category"
            
          />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {providers.map((provider) => (
          <ServiceProviderCard
            key={provider.id}
            id={provider.id}
            name={provider.name}
            avatarUrl={provider.avatarUrl}
            skills={provider.skills}
            location={provider.location}
          />
        ))}
        </div>
      </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
