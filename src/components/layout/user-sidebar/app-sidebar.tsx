import * as React from "react"
import { NavDiscover } from "@/components/layout/user-sidebar/nav-discover"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavProfile } from "./nav-profile"
import { NavHeader } from "./nav-header"
import { NavUser } from "./nav-user"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { data } from "./nav-constant"


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = await getServerSession(authOptions)
    if (!session?.user?.id) return null

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavDiscover items={data.discover} />
        <NavProfile items={data.navProfile} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
