"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

import { iconMap, type IconKey } from "./nav-constant"

export function NavDiscover({
  items,
}: {
  items: readonly {
    title: string
    url: string
    icon?: IconKey
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>DISCOVER</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const Icon = item.icon ? iconMap[item.icon] : null

          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url} className="flex items-center gap-2">
                  {Icon && <Icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}