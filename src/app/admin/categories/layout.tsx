import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard – Categories | Tayug Skills Hub",
  description: "Manage and oversee skill categories in the admin dashboard of Tayug Skills Hub.",
  keywords: [
    "admin dashboard",
    "category management",
    "skill categories",
    "skills management",
    "user management",
    "service provider management",
    "Tayug Skills Hub",
    "platform settings",
    "moderation",
  ],
};

export default function AdminDashboardCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return  (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
      {/* header */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Manage Categories</h1>
        <p className="text-muted-foreground text-sm">
          Create, update, and organize skill categories to keep the platform structured and user-friendly.
        </p>
      </header>
      {children}
    </main>
  )
}
