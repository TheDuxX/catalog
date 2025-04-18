"use client";

import { useSidebar } from "@/app/_components/ui/sidebar";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { Home, Store, PackagePlus, Bolt } from "lucide-react";

const items = [
  {
    title: "Início",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Produtos",
    url: "/dashboard/products",
    icon: Store,
  },
  {
    title: "Novo Produto",
    url: "/dashboard/new-product",
    icon: PackagePlus,
  },
  {
    title: "Configurações",
    url: "/dashboard/settings",
    icon: Bolt,
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="relative h-10 mt-4 transition-all">
        {state === "collapsed" ? (
          <Image
            src="/favicon.ico"
            alt="Logo reduzida"
            width={30}
            height={30}
            className="object-contain"
          />
        ) : (
          <Image
            priority={true}
            src="/logo.png"
            alt="Logo completa"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-4 mt-2">
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:bg-secondary rounded-full">
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2 hover:bg-transparent hover:rounded-full hover:font-semibold p-4">
                      <item.icon />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
