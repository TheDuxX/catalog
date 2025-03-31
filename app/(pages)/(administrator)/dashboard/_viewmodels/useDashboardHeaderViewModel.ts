"use client";
import { usePathname, useRouter } from "next/navigation";

export const useDashboardHeaderViewModel = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Produtos", href: "/dashboard/products" },
    { name: "Novo Produto", href: "/dashboard/new-product" },
    { name: "Configurações", href: "/dashboard/settings" },
  ];

  const currentTitle = links.find((link) => link.href === pathname)?.name || "Dashboard";

  return {
    currentTitle,
    goBack: router.back,
  };
};
