"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  // hide header on these routes
  if (isAdminRoute || isDashboardRoute || isAuthRoute) return null;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-primary">
          Tayug Skills Hub
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/browse-providers" className="hover:text-primary">
            Browse
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="secondary">
              <Link href="/auth/signup">Offer Services</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </nav>

      </div>
    </header>
  );
}