"use client"

import * as React from "react"
import {
  FileCheck,
  Layers,
  LayoutDashboard,
  List,
  ShieldAlert,
  UserRound,
  UserRoundCheck,
  Users,
  UsersRound,
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
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Users",
          url: "#",
        },
        {
          title: "Users",
          url: "#",
        },
        {
          title: "Service Providers",
          url: "#",
        },
      ],
    },
    {
      title: "Skills",
      url: "#",
      icon: Layers,
      isActive: true,
      items: [
        {
          title: "Categories",
          url: "/admin/categories",
        },
        {
          title: "Skills",
          url: "/admin/skills",
        },
      ],
    },
    {
      title: "Provider Applications",
      url: "#",
      icon: FileCheck,
    },
    {
      title: "Reports",
      url: "#",
      icon: ShieldAlert,
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
