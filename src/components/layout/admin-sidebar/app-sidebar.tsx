"use client"

import * as React from "react"
import {
  Layers,
  LayoutDashboard,
  Lightbulb,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavHeader } from "./nav-header"
import { NavDashboard } from "./nav-dashboard"
import { NavUser } from "./nav-user"


// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
    navDashboard: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Service Providers",
      url: "/admin/service-providers",
      icon: Users,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: Layers,
    },
    {
      title: "Skills",
      url: "/admin/skills",
      icon: Lightbulb,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard items={data.navDashboard} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
