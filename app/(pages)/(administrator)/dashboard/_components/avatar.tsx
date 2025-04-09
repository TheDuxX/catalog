import { logout } from "@/app/(pages)/(auth)/login/actions";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { User } from "lucide-react";

const Avatar = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="border border-gray-500 rounded-full">
            <User size={36} className="stroke-1 text-gray-500" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex justify-center items-center w-fit" align="end">
          <Button className="w-full" onClick={logout}>Logout</Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Avatar;
