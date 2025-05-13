"use client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
const Header = () => {
  const pathname = usePathname();

  const link = [
    { name: "Home", href: "/" },
    { name: "Produtos", href: "/products" },
    { name: "Contato", href: "/contact" },
    { name: "Sobre", href: "/about" },
  ];

  return (
    <>
      <div className="w-full h-auto shadow-md flex md:flex-col flex-row justify-center items-center bg-background">
        <div className="w-full max-w-[1150px] max-h-24 flex justify-start md:justify-center px-2  items-center z-10 ">
          <div className="relative md:w-[300px] w-[200px] h-24">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt="logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </div>
        <div className="block md:hidden px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MenuIcon size={36} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[200px] mx-4 flex flex-col gap-2">
              {link.map((link, index) => (
                <DropdownMenuItem
                  key={`${link.href}-${index}`}
                  className={` text-xl w-full flex  justify-end ${
                    pathname === link.href ? "font-bold text-xl italic " : ""
                  }`}
                >
                  <Link href={link.href}>{link.name}</Link>
                  {pathname === link.href ? (
                    <div className="w-1 h-5 bg-secondary rounded-full"></div>
                  ) : (
                    ""
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full min-h-16 h-full md:flex flex-row items-center justify-center bg-secondary hidden">
          <div className="lg:max-w-[1140px] w-full flex flex-row justify-center items-center gap-1">
            {link.map((link, index) => (
              <Link
                key={`${link.href}-${index}`} 
                href={link.href}
                className={`hover:text-secondary hover:bg-primary w-full h-full p-5 rounded-md text-lg text-center ${
                  pathname === link.href ? "font-bold text-xl italic " : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
