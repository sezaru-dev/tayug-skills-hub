"use client"

import * as React from "react"
import {
  LayoutDashboard,
  List,
  ShieldAlert,
  UserRound,
  UserRoundCheck,
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
import { NavUser } from "./nav-user"
import { NavDashboard } from "./nav-dashboard"


// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
    navDashboard: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Approvals",
      url: "#",
      icon: UserRoundCheck,
    },
    {
      title: "Service Providers",
      url: "#",
      icon: UsersRound,
    },
    {
      title: "Clients",
      url: "#",
      icon: UserRound,
    },
    {
      title: "Categories",
      url: "#",
      icon: List,
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
