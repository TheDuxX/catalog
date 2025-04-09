"use client";
import { User } from "lucide-react";
import { useDashboardHeaderViewModel } from "../_viewmodels/useDashboardHeaderViewModel";
import { SidebarTrigger } from "@/app/_components/ui/sidebar";
import SearchBar from "./dashboard-search-bar";
import Avatar from "./avatar";

const DashboardHeader = () => {
  const { currentTitle, goBack } = useDashboardHeaderViewModel();

  return (
    <div className="w-full h-auto bg-white p-2 border-b border-gray-200 flex flex-row justify-between items-center gap-2">
      <div className="flex-row flex items-center gap-2 w-1/4 text-gray-700">
        <SidebarTrigger className="hover:bg-transparent" />
        <h2 className="font-semibold text-2xl">{currentTitle}</h2>
      </div>
      <div className="flex-row flex items-center gap-2 w-2/4">
        <SearchBar />
        <Avatar />
      </div>
    </div>
  );
};

export default DashboardHeader;
