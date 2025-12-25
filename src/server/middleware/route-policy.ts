import { NextResponse } from "next/server"
import type { Role } from "@/types/roles"

export function handleRoleBasedRedirect(role: Role, pathname: string, reqUrl: string) {
  // ----- ADMIN ONLY -----
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/dashboard/browse-providers", reqUrl)
      )
    }
    return NextResponse.next()
  }

  // ----- DASHBOARD -----
  if (pathname.startsWith("/dashboard")) {
    const providerOnlyRoutes = [
      "/dashboard/overview",
      "/dashboard/manage-profile",
      "/dashboard/sample-works",
      "/dashboard/analytics",
    ]

    if (providerOnlyRoutes.some(route => pathname.startsWith(route)) && role !== "PROVIDER") {
      return NextResponse.redirect(
        new URL("/dashboard/browse-providers", reqUrl)
      )
    }

    const sharedRoutes = [
      "/dashboard/browse-providers",
      "/dashboard/saved-providers",
      "/dashboard/recently-viewed",
      "/dashboard/account",
      "/dashboard/notifications",
    ]

    if (sharedRoutes.some(route => pathname.startsWith(route)) && role === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin", reqUrl)
      )
    }
  }

  return NextResponse.next()
}
