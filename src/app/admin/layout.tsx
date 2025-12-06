import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tayug Skills Hub – Admin Dashboard",
  description: "Manage users, service providers, and platform settings in Tayug Skills Hub.",
  keywords: ["admin dashboard", "user management", "service provider management", "Tayug Skills Hub", "moderation", "platform settings"],
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
