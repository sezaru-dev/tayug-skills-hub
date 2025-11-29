"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-primary">
          Tayug Skills Hub
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link href="/listings" className="hover:text-primary">
            Listings
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>

          {/* Login Button using ShadCN Button */}
          <Button asChild variant="outline" className="ml-4">
            <Link href="/auth/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
