export const dynamic = "force-dynamic"
import { CategoryRepository } from "@/features/categories/data/category-repository"
import { CategoriesProvider } from "@/features/skills/components/provider/CategoriesProvider"
import SkillsTable from "@/features/skills/components/SkillsTable"

export default async function SkillsPage() {

  const categories = await CategoryRepository.getActiveCategories()

  return (
    <CategoriesProvider initialData={categories}>
      <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Skills</h1>
          <p className="text-muted-foreground text-sm">
            Add, update, and organize skills within categories to help users showcase their abilities effectively.
          </p>
        </div>

        <SkillsTable />
      </main>
    </CategoriesProvider>
  )
}