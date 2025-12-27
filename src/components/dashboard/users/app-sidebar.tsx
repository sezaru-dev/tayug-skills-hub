"use client"

import * as React from "react"
import {
  BarChart2,
  Bookmark,
  History,
  Image,
  LayoutDashboard,

  Search,
  User,
} from "lucide-react"

import { NavDiscover } from "@/components/dashboard/users/nav-discover"
/* import { NavUser } from "@/components/nav-user" */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavDashboard } from "./nav-dashboard"
import { NavHeader } from "./nav-header"
import { NavUser } from "./nav-user"
import { Role } from "@/types/roles"
import { useSession } from "next-auth/react"
import { NavApplyProvider } from "./nav-apply"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  discover: [
    {
      title: "Browse Providers",
      url: "/dashboard/browse-providers",
      icon: Search,
    },
    {
      title: "Saved Providers",
      url: "/dashboard/saved-providers",
      icon: Bookmark,
    },
    {
      title: "Recently Viewed",
      url: "/dashboard/recently-viewed",
      icon: History,
    },
  ],
    navDashboard: [
    {
      title: "Overview",
      url: "/dashboard/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Profile",
      url: "/dashboard/manage-profile",
      icon: User,
    },
    {
      title: "Sample Works",
      url: "/dashboard/sample-works",
      icon: Image,
    },
    {
      title: "Analytic",
      url: "/dashboard/analytics",
      icon: BarChart2,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavDiscover items={data.discover} />

        {session?.user.role === Role.USER && (
          <NavApplyProvider />
        )}
        {
          session?.user.role === Role.PROVIDER? 
          <NavDashboard items={data.navDashboard} />
          : ''
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
