"use client";

import { useDashboardHeaderViewModel } from "../_viewmodels/useDashboardHeaderViewModel";
import { SidebarTrigger } from "@/app/_components/ui/sidebar";
import SearchBar from "./dashboard-search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { SearchIcon } from "lucide-react";

const DashboardHeader = () => {
  const { currentTitle } = useDashboardHeaderViewModel();

  return (
    <header className="w-full bg-white border-b border-gray-200 p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-gray-700 w-full md:w-1/4">
          <SidebarTrigger className="hover:bg-transparent" />
          <h2 className="text-2xl font-semibold truncate">{currentTitle}</h2>
        </div>

        <div className="hidden md:flex items-center gap-4 w-full justify-end">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        <div className="flex md:hidden items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Abrir busca">
                <SearchIcon className="text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 p-2 bg-white/90 shadow border-none w-72">
              <SearchBar />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
