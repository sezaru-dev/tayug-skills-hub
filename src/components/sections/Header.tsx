"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()

  const isAdminRoute = pathname.startsWith("/admin")
  const isDashboardRoute = pathname.startsWith("/dashboard")
  const isAuthRoute = pathname.startsWith("/auth")
  const isHomePage = pathname === "/"

  // ALL hooks must be declared before conditional return
  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  // hide header on these routes
  if (isAdminRoute || isDashboardRoute || isAuthRoute) return null

  const isTransparent = isHomePage && !scrolled

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-colors duration-300",
        isTransparent ? "bg-transparent" : "bg-white border-b shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "text-lg font-semibold transition-colors",
            isTransparent ? "text-white" : "text-primary"
          )}
        >
          Tayug Skills Hub
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/browse-providers"
            className={cn(
              "transition hover:opacity-80",
              isTransparent ? "text-white" : "text-primary"
            )}
          >
            Browse
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/auth/signup">Offer Services</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </nav>

        {/* mobile toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden z-50"
        >
          <Menu
            size={24}
            className={isTransparent ? "text-white" : "text-primary"}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "fixed inset-0 bg-gray-50 transition-transform duration-300 ease-in-out md:hidden z-50",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-4"
        >
          <X size={24} className="text-primary" />
        </button>

        <div className="max-w-7xl mx-auto h-full flex items-center justify-center px-4">
          <ul className="flex flex-col items-center gap-6 w-full max-w-sm text-center">

            <li className="w-full">
              <Button asChild variant="ghost" className="w-full">
                <Link href="/browse-providers" onClick={() => setIsOpen(false)}>
                  Browse
                </Link>
              </Button>
            </li>

            <li className="w-full">
              <Button asChild className="w-full">
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  Offer Services
                </Link>
              </Button>
            </li>

            <li className="w-full">
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            </li>

          </ul>
        </div>
      </div>
    </header>
  )
}