"use client"

import {
  BadgeCheck,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,

  MenubarTrigger,
} from "@/components/ui/menubar"
export function NavUser({
  user
}) {
  const { isMobile } = useSidebar()

  return (
    <Menubar>
      <MenubarMenu>
      <MenubarTrigger
        className="flex items-center justify-center w-8 h-8 rounded-full"
        aria-label="User menu"
      >
        <Avatar className="">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            {user.name?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
          <BadgeCheck className="mr-2 w-4 h-4" />

              Account         
           </MenubarItem>
          <MenubarItem>
              <LogOut className="mr-2 w-4 h-4" />
              Logout
          </MenubarItem>

        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
