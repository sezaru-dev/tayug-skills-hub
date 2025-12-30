import { Button } from "@/components/ui/button"
import { columns, Skill } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Skill[]> {
  // Fetch data from your API here.
  return [
    {
      id: "cat1",
      name: "Plumbing",
      slug: "plumbing",
      isActive: true,
      category: "Home Repair & Maintenance",
      createdAt: new Date("2025-01-01T10:00:00Z"),
      updatedAt: new Date("2025-12-01T12:00:00Z"),
    },
    {
      id: "cat2",
      name: "Electrical Installation",
      slug: "electrical-installation",
      isActive: true,
      category: "Construction & Engineering",
      createdAt: new Date("2025-02-05T09:30:00Z"),
      updatedAt: new Date("2025-12-10T15:45:00Z"),
    },
    {
      id: "cat3",
      name: "Cooking",
      slug: "cooking",
      isActive: true,
      category: "Food & Catering",
      createdAt: new Date("2025-03-10T08:15:00Z"),
      updatedAt: new Date("2025-12-15T11:20:00Z"),

    },
    {
      id: "cat4",
      name: "Hair Styling",
      slug: "hair-styling",
      isActive: false,
      category: "Beauty & Personal Care",
      createdAt: new Date("2025-04-12T14:45:00Z"),
      updatedAt: new Date("2025-12-18T16:30:00Z"),
    },
    {
      id: "cat5",
      name: "Web Development",
      slug: "web-development",
      isActive: true,
      category: "Technology & IT",
      createdAt: new Date("2025-05-20T11:00:00Z"),
      updatedAt: new Date("2025-12-20T13:50:00Z"),
    }
  ]
}

  export default async function CategoriesPage() {
    const data = await getData()
  
    return (
      <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
          
          {/* header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Skills</h1>
          <p className="text-muted-foreground text-sm">
            Add, update, and organize skills within categories to help users showcase their abilities effectively.
          </p>
          </div>
  
  
        {/* data table */}
        <div className="w-full">
          <DataTable columns={columns} data={data} />
        </div>
        
      </main>
    )
  }

