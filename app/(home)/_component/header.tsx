import { Menu } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="w-full h-auto shadow-md  flex flex-col justify-center items-center">
        <div className="w-full lg:max-w-[1150px] max-h-24 flex flex-row justify-center items-center shadow-sm z-10">
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
          <ul className="flex flex-row justify-around items-center h-full w-full lg:max-w-[1150px] font-bold">
            <li className="hover:text-secondary hover:bg-primary w-full h-full flex justify-center">Home</li>
            <li className="hover:text-secondary hover:bg-primary w-full h-full flex justify-center">Produtos</li>
            <li className="hover:text-secondary hover:bg-primary w-full h-full flex justify-center">Contato</li>
            <li className="hover:text-secondary hover:bg-primary w-full h-full flex justify-center">Sobre</li>
          </ul>{" "}
        </div>
      </div>
    </>
  );
};

export default Header;
