import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    const role = token.role

    // ----- ADMIN ONLY -----
    if (pathname.startsWith("/admin")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(
          new URL("/dashboard/browse-providers", req.url)
        )
      }
      return NextResponse.next()
    }

    // ----- DASHBOARD -----
    if (pathname.startsWith("/dashboard")) {

      // 🔒 Provider-only routes
      const providerOnlyRoutes = [
        "/dashboard/overview",
        "/dashboard/manage-profile",
        "/dashboard/sample-works",
        "/dashboard/analytics",
      ]

      if (
        providerOnlyRoutes.some(route => pathname.startsWith(route)) &&
        role !== "PROVIDER"
      ) {
        return NextResponse.redirect(
          new URL("/dashboard/browse-providers", req.url)
        )
      }

      // 👥 Shared USER + PROVIDER routes
      const sharedRoutes = [
        "/dashboard/browse-providers",
        "/dashboard/saved-providers",
        "/dashboard/recently-viewed",
        "/dashboard/account",
        "/dashboard/notifications",
      ]

      if (
        sharedRoutes.some(route => pathname.startsWith(route)) &&
        role === "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
  ],
}
