import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-grow">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
