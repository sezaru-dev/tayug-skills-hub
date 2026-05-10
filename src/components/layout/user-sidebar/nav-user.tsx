"use client"

import {
  ChevronsUpDown,
  LogOut,
  UserRoundCog,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Session } from "next-auth"
import { useGetProfileById } from "@/features/profile/queries/use-get-profile-by-id"
import { Skeleton } from "@/components/ui/skeleton"


type AvatarProps = {
  session: Session

}

export function NavUser({session}: AvatarProps) {
  const { isMobile } = useSidebar()
  const { data : profile, isLoading, error } = useGetProfileById()
  
  if (error) return <div className="text-red-600">{(error as Error).message}</div>

  const fullname = profile?.fullname ? profile.fullname : session.user.name
  const avatarInitial = profile?.fullname ? profile.fullname.charAt(0).toUpperCase() : session?.user?.name?.charAt(0).toUpperCase()
  
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-8 rounded-lg" />

                <div className="grid flex-1 gap-1 text-left">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-3 w-[160px]" />
                </div>

                <Skeleton className="ml-auto h-4 w-4" />
              </>
            ) : (
              <>
                <Avatar className="h-8 w-8 rounded-lg">
                  {session?.user?.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarFallback>{avatarInitial}</AvatarFallback>
                  )}
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{fullname}</span>
                  <span className="truncate text-xs">{session?.user?.email}</span>
                </div>

                <ChevronsUpDown className="ml-auto size-4" />
              </>
            )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {session?.user?.image ? 
                  <AvatarImage src={session?.user?.image} alt={session?.user?.name ?? "User avatar"}  />
                  :
                  <AvatarFallback className="rounded-lg">{avatarInitial}</AvatarFallback>
                  }
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{fullname}</span>
                  <span className="truncate text-xs">{session?.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href='/dashboard/account' className="flex items-center gap-2">
                  <UserRoundCog />
                  Account Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button type="button" onClick={() => signOut({callbackUrl: "/auth/login"})} className="w-full">
                <LogOut />
                Log out
              </button>              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
