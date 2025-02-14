import Slider from "@/app/_components/slider";

const SlideBanner = () => {
  return (
    <>
      <div className="lg:max-w-[1150px] lg:h-[240px] rounded-md w-full h-[160px]">
        <Slider width={1150} height={240}/>
      </div>
    </>
  );
};

export default SlideBanner;
