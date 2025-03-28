"use client";
import SearchBar from "@/app/_components/search";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, User } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

const DashboardHeader = () => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Produtos", href: "/dashboard/products" },
    { name: "Novo Produto", href: "/dashboard/new-product" },
    { name: "Configurações", href: "/dashboard/settings" },
  ];

  return (
    <div className="w-full h-auto bg-white p-2 border-b border-gray-200 flex flex-row justify-between items-center gap-2">
      <div className="flex-row flex items-center gap-2 w-1/4 text-gray-700">
        <Button variant="ghost" className="p-0 hover:bg-transparent"size="icon" onClick={router.back}>
          <ChevronLeft />
        </Button>
        {links.map((link) => {
          if (link.href === pathname) {
            return (
              <h2 key={link.href} className="font-semibold text-2xl">
                {link.name}
              </h2>
            );
          }
          return null;
        })}
      </div>
      <div className="flex-row flex items-center gap-2 w-2/4">
        <SearchBar />
        <div className="border border-gray-500 rounded-full">
          <User size={36} className="stroke-1 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
