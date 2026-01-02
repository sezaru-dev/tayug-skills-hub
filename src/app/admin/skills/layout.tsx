import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard – Skills | Tayug Skills Hub",
  description: "Manage and oversee skills, skill categories, and related settings in the admin dashboard of Tayug Skills Hub.",
  keywords: [
    "admin dashboard",
    "skills management",
    "skill categories",
    "user management",
    "service provider management",
    "Tayug Skills Hub",
    "platform settings",
    "moderation"
  ],
};
export default function AdminDashboardSkillLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    {children}
    </>
  );
}

