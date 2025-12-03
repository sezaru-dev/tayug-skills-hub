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

import { NavDiscover } from "@/components/nav-discover"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavDashboard } from "./nav-dashboard"
import { NavHeader } from "./nav-header"


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
      url: "#",
      icon: Search,
    },
    {
      title: "Saved Providers  ",
      url: "#",
      icon: Bookmark,
    },
    {
      title: "Recently Viewed   ",
      url: "#",
      icon: History,
    },
  ],
    navDashboard: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Profile",
      url: "#",
      icon: User,
    },
    {
      title: "Sample Works",
      url: "#",
      icon: Image,
    },
    {
      title: "Analytic",
      url: "#",
      icon: BarChart2,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavDiscover items={data.discover} />
        <NavDashboard items={data.navDashboard} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
