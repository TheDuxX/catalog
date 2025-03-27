import Image from "next/image";

const DashboardHeader = () => {
  return (
    <div className="w-full h-auto bg-white shadow">
      <div className="max-w-[1150px] mx-auto">
        <div className="relative w-[200px] h-24">
          <Image src="/logo.png" alt="logo" className="object-contain" fill />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
