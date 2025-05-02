"use client";

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
  SidebarFooter,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/app/_components/ui/sidebar";
import {
  Home,
  Store,
  PackagePlus,
  Bolt,
  User2,
  Users2,
  FilterIcon,
  ImageIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Profile from "./profile";
import { useUserViewModel } from "../_viewmodels/useUser";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import Link from "next/link";

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
];

const settings = [
  {
    title: "Perfil",
    url: "/dashboard/settings/profile",
    icon: User2,
  },
  {
    title: "Histórico de Logs",
    url: "/dashboard/settings/logs",
    icon: Users2,
  },
  {
    title: "Categorias e Marcas",
    url: "/dashboard/settings/filters",
    icon: FilterIcon,
  },
  {
    title: "Banners",
    url: "/dashboard/settings/banners",
    icon: ImageIcon,
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const { user, isLoading } = useUserViewModel();

  const avatar = isLoading ? (
    "Carregando..."
  ) : (
    <>
      {user?.avatar ? (
        <img src={user.avatar} alt="Avatar" />
      ) : (
        <User2 className="w-full h-full p-2 stroke-1 bg-white rounded-full shadow" />
      )}
    </>
  );

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
                <SidebarMenuItem
                  key={item.title}
                  className="rounded-full"
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 hover:rounded-full hover:font-semibold"
                    >
                      <item.icon />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Collapsible defaultOpen>
                <SidebarMenuItem className="">
                  <CollapsibleTrigger asChild >
                    <SidebarMenuButton className="rounded-full hover:font-semibold cursor-default">
                      <Bolt />
                      <span>Configurações</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="">
                      {settings.map((item) => (
                        <SidebarMenuSubItem
                          key={item.title}
                          className="rounded-full px-2"
                        >
                          <SidebarMenuSubButton asChild>
                            <a
                              href={item.url}
                              className="flex items-center gap-2 hover:rounded-full hover:font-semibold p-4 text-nowrap"
                            >
                              <item.icon className="stroke-1" />
                              {item.title}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <SidebarMenu className="p-0 w-full ">
          <SidebarMenuItem className="p-0 w-full transition-all">
            {state === "collapsed" ? avatar : <Profile isCollapsed={state} />}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
