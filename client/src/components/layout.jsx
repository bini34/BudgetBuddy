"use client";
import { AppSidebar } from "@/components/sidebar"
import { useState } from "react";
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import CalanderPopover  from "@/components/calanderpopover"

export default function Layout({ children }) {
    const [date, setDate] = useState();
    
    const data = {
        user: {
          name: "shadcn",
          email: "m@example.com",
          avatar: "/avatars/shadcn.jpg",
        },
      };
     

  return (
    (<SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header
            className="sticky top-0 flex justify-between h-16 shrink-0 items-center gap-2 border-b bg-background px-10">
              <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CalanderPopover date={date} setDate={setDate} />
            </div>
            <NavUser user={data.user} />
          </header>
          <main className="flex flex-col gap-4  p-10">
            {children}
          </main>
          </SidebarInset>
          </SidebarProvider>)

  );
}