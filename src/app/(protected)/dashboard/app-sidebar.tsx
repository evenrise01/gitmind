"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useProject from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";
import { cn } from "@/lib/utils";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const {projects, projectId, setProjectId} = useProject()

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo image" height={40} width={40} />
          {open && (
            <h1 className="text-xl font-bold text-primary/80">GitMind</h1>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "rounded-md px-3 py-2 transition-colors duration-200",
                          "hover:bg-muted/80",
                          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900",
                          pathname === item.url
                            ? "bg-primary font-medium text-primary-foreground"
                            : "text-foreground/80 hover:text-foreground",
                        )}
                      >
                        <item.icon />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project, index) => {
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <div onClick={() => {
                        setProjectId(project.id)
                      }}>
                        <div
                          className={cn(
                            "flex size-6 items-center justify-center rounded-sm border",
                            "text-sm transition-colors duration-150",
                            project.id === projectId
                              ? "border-primary/30 bg-primary text-primary-foreground"
                              : "border-muted-foreground/20 bg-background text-foreground/80",
                          )}
                        >
                          {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <div className="h-4"></div>

              {open && (
                <SidebarMenuItem>
                  <Link href={"/create"}>
                    <Button size="sm" variant={"outline"} className="w-fit">
                      <Plus />
                      Create project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
