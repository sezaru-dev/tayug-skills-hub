import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tayug Skills Hub – Dashboard",
  description: "Browse skills, manage your profile, and connect with service providers or clients on Tayug Skills Hub.",
  keywords: ["dashboard", "user dashboard", "client dashboard", "provider dashboard", "profile management", "Tayug Skills Hub", "skills directory"],
};

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
