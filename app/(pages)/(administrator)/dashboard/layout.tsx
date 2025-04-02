import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <SidebarProvider>
        {/* Sidebar ocupa um espaço fixo */}
        <AppSidebar />

        {/* Main ocupa todo o restante do espaço disponível */}
        <main className="flex-grow w-full overflow-auto">{children}</main>
      </SidebarProvider>
    </div>
  );
}
