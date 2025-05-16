"use client";

import { logout } from "@/app/(pages)/(auth)/login/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/app/_components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import { useUserViewModel } from "../_viewmodels/useUser";
import { Skeleton } from "@/app/_components/ui/skeleton";
import Image from "next/image";

const Profile = () => {
  const { user, isLoading, redirectToProfile } = useUserViewModel();

  const username = isLoading
    ? "Carregando..."
    : user?.username || "Usuário sem nome";

  if (isLoading)
    return <Skeleton className="h-10 w-full bg-white shadow"></Skeleton>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="flex items-center h-14 p-0 focus-visible:ring-0">
          <div className="h-[40px] w-[40px] flex justify-center items-center shadow rounded-full overflow-hidden">
            {user?.avatar ? (
              <div className="relative w-full h-full">
                <Image
                  src={user.avatar}
                  fill
                  alt={username}
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <User2 className="w-full h-full p-2 stroke-1 bg-white" />
            )}
          </div>
          <p>{username}</p>
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width] border-none bg-white shadow"
      >
        <DropdownMenuItem onClick={redirectToProfile}>
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
