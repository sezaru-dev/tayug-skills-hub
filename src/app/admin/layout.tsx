import { Metadata } from "next";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumbs } from "@/components/custom/DynamicBreadcrumbs";
import { AppSidebar } from "@/features/admin/components/sidebar/app-sidebar";

export const metadata: Metadata = {
  title: "Tayug Skills Hub – Admin Dashboard",
  description: "Manage users, service providers, and platform settings in Tayug Skills Hub.",
  keywords: ["admin dashboard", "user management", "service provider management", "Tayug Skills Hub", "moderation", "platform settings"],
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='sticky top-0 z-50 flex flex-col'>
            <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background/30 backdrop-blur-xl px-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <DynamicBreadcrumbs/>
                </div>
              </div>
            </div>
          </header>

          {children}
        </SidebarInset>
      </SidebarProvider>
  );
}
