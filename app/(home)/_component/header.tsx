import { Menu } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="w-full h-20 shadow-md  flex flex-row justify-center items-center p-2">
        <div className="w-full lg:max-w-[1150px] flex flex-row justify-between items-center p-2">
            <div className="relative lg:w-[300px] w-[200px] h-20">
                <Image src={"/logo.png"} alt="logo" fill className="object-contain"/>
            </div>
            <Menu />
        </div>
      </div>
    </>
  );
};

export default Header;
