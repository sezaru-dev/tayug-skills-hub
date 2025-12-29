import { Button } from "@/components/ui/button"
import { columns, Category } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Category[]> {
  // Fetch data from your API here.
  return [
    {
      id: "cat1",
      name: "Home Repair & Maintenance",
      slug: "home-repair-maintenance",
      isActive: true,
      createdAt: new Date("2025-01-01T10:00:00Z"),
      updatedAt: new Date("2025-12-01T12:00:00Z"),
      skills: ["Plumbing", "Carpentry", "Electrical Repair"]
    },
    {
      id: "cat2",
      name: "Cleaning & Sanitation",
      slug: "cleaning-sanitation",
      isActive: true,
      createdAt: new Date("2025-02-05T09:30:00Z"),
      updatedAt: new Date("2025-12-10T15:45:00Z"),
      skills: ["House Cleaning", "Office Sanitation", "Waste Management"]
    },
    {
      id: "cat3",
      name: "Construction & Engineering",
      slug: "construction-engineering",
      isActive: true,
      createdAt: new Date("2025-03-10T08:15:00Z"),
      updatedAt: new Date("2025-12-15T11:20:00Z"),
      skills: ["Masonry", "Structural Design", "Site Supervision"]
    },
    {
      id: "cat4",
      name: "Automotive & Transport",
      slug: "automotive-transport",
      isActive: false,
      createdAt: new Date("2025-04-12T14:45:00Z"),
      updatedAt: new Date("2025-12-18T16:30:00Z"),
      skills: ["Car Repair", "Vehicle Maintenance", "Logistics Driving"]
    },
    {
      id: "cat5",
      name: "Beauty & Personal Care",
      slug: "beauty-personal-care",
      isActive: true,
      createdAt: new Date("2025-05-20T11:00:00Z"),
      updatedAt: new Date("2025-12-20T13:50:00Z"),
      skills: ["Hair Styling", "Makeup Artistry", "Massage Therapy"]
    }
  ]
}

export default async function CategoriesPage() {
  const data = await getData()

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
        
        {/* header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Categories</h1>
          <p className="text-muted-foreground text-sm">
            Create, update, and organize skill categories to keep the platform structured and user-friendly.
          </p>
        </div>


      {/* data table */}
      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
      
    </main>
  )
}