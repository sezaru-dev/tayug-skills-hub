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
  return <>{children}</>;
}
