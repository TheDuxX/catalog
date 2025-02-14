"use client";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

interface ProdctDetailsPageProps {
  params: {
    url?: string;
  };
}
const Header = () => {
  const pathname = usePathname();

  const link = [
    { name: "Home", href: "/" },
    { name: "Produtos", href: "/products" },
    { name: "Contato", href: "/contact" },
    { name: "Sobre", href: "/about" },
  ];

  const active = true;

  return (
    <>
      <div className="w-full h-auto shadow-md  flex flex-col justify-center items-center">
        <div className="w-full shadow-md max-h-24 flex flex-row justify-center items-center z-10 bg-background">
          <div className="relative lg:w-[300px] w-[200px] h-24">
            <Image
              src={"/logo.png"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full min-h-16 h-full flex flex-row items-center justify-center bg-secondary">
          <div className="lg:max-w-[1140px] w-full flex flex-row justify-center items-center gap-1">
            {link.map((link, index) => (
              <Link
                key={`${link.href}-${index}`} // Garante que a chave é única
                href={link.href}
                className={`hover:text-secondary hover:bg-primary w-full h-full p-5 rounded-md text-lg text-center ${
                  pathname === link.href
                    ? "font-bold text-xl italic "
                    : ""
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
