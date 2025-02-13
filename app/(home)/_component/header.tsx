import { Button } from "@/app/_components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const active = true;

  return (
    <>
      <div className="w-full h-auto shadow-md  flex flex-col justify-center items-center">
        <div className="w-full shadow-md max-h-24 flex flex-row justify-center items-center z-10">
          <div className="relative lg:w-[300px] w-[200px] h-svh">
            <Image
              src={"/logo.png"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          {/* <Menu /> */}
        </div>
        <div className="w-full min-h-16 h-full flex flex-row items-center justify-center bg-secondary">
          <div className="lg:max-w-[1140px] w-full flex flex-row justify-center items-center gap-1">
            <Button
              className={`hover:text-secondary hover:bg-primary w-full h-full p-5 rounded-md text-lg ${active ? "font-semibold" : ""}`}
              variant="ghost"
            >
              Home
            </Button>
            <Button
              className={`hover:text-secondary hover:bg-primary w-full h-full p-5 rounded-md text-lg `}
              variant="ghost"
            >
              Produtos
            </Button>
            <Button
              className={`hover:text-secondary hover:bg-primary w-full h-full p-5 rounded-md text-lg `}
              variant="ghost"
            >
              Contato
            </Button>
            <Button
              className={`hover:text-secondary hover:bg-primary w-full h-full p-5 rounded-md text-lg `}
              variant="ghost"
            >
              Sobre
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
