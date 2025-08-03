"use client";

import {
  BookOpen,
  Bot,
  Moon,
  Settings2,
  SquareTerminal,
  Sun
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "All Events",
      url: "/dashboard/events",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Event",
          url: "/dashboard/events/create",
        },
      ],
    },
    {
      title: "Tickets",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Create Ticket",
          url: "#",
        },
      ],
    },
    {
      title: "Vouchers",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Create Voucher",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Change Password",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
  
    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-base font-semibold">Evaria</span>
              </a>
            </SidebarMenuButton>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
