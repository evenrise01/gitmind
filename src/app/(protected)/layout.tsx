import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { AppSidebar } from "./app-sidebar";
import { ThemeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
};

const Sidebarlayout = ({ children }: Props) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="m-2 w-full">
          <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 shadow">
          <SidebarTrigger size={'sm'} className="-ml-1 " />
          <Separator orientation="vertical" className="mr-2 h-4" />
            {/* Search bar */}
            <div className="ml-auto"></div>
            <ThemeToggle />
            <UserButton />
          </div>
          <div className="h-4"></div>
          {/* Main Content */}
          <div className="h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border border-sidebar-border bg-sidebar p-4 shadow">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Sidebarlayout;
