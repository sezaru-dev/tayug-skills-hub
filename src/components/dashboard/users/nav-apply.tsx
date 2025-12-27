// NavApplyProvider.tsx
import Link from "next/link"
import { Briefcase, UserPlus } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavApplyProvider() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>PROFESSIONAL</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Become a Professional" className="text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium">
            <Link href="/dashboard/apply-provider" className="flex gap-2">
              <Briefcase />
              <span>Offer Your Skills</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
