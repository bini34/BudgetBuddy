"use client"
import { LayoutDashboard, Wallet, TrendingUp, CreditCard, PiggyBank, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail, SidebarSeparator} from "@/components/ui/sidebar"
import Link from 'next/link'


export function AppSidebar({
  ...props
}) {
  const pathname = usePathname();

  function isSelected(path){
    const isActive = pathname === path;
    return `flex gap-2 py-2 ${isActive ? 'text-green-500' : 'bg-transparent'} hover:text-green-500`;
  }

  return (
    (<Sidebar {...props}>
      <SidebarHeader className="h-16 border-b  border-sidebar-border flex justify-center items-center">
        <Button variant="ghost" className="w-full justify-start">
          <span className="text-xl ">BudgetBuddy</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator className="mx-0" />
        <SidebarMenu className="flex flex-col gap-2 pl-4">
          <SidebarMenuItem>
            <Link href="/dashboard" className={isSelected('/dashboard')}>
              <LayoutDashboard className="mr-2 h-6 w-6" />
              <span className="text-md">Dashboard</span>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/budget" className={isSelected('/budget')}>
              <Wallet className="mr-2 h-6 w-6" />
              <span className="text-md">Budget Setup</span> 
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/expense" className={isSelected('/expense')}>
              <CreditCard className="mr-2 h-6 w-6" />
              <span className="text-md">Expense Tracking</span> 
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/income" className={isSelected('/income')}>
              <TrendingUp className="mr-2 h-6 w-6" />
              <span className="text-md">Income Tracking</span>  
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/savings" className={isSelected('/savings')}>
              <PiggyBank className="mr-2 h-6 w-6" />
              <span className="text-md">Monthly Savings Goals</span>   
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/reports" className={isSelected('/reports')}>
              <BarChart className="mr-2 h-6 w-6" />
              <span className="text-md">Reports and Insights</span>   
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>

      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
