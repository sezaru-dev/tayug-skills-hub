import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { handleRoleBasedRedirect } from "./server/middleware/route-policy"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
    
    return handleRoleBasedRedirect(token.role, pathname, req.url)
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
