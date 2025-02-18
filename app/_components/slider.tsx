import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface SliderProps {
  width?: number;
  height?: number;
}

const Slider = ({ width, height }: SliderProps) => {
  const images = [
    {
      id: 1,
      name: "Valtra",
      src: "/banner_home.png",
      alt: "Logo 1",
    },
  ];

  return (
    <>
      <Carousel
        className="w-full h-full rounded-md shadow-md overflow-hidden"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="flex items-center justify-center">
          {images.map((photo) => (
            <img
              src={photo.src}
              alt={photo.alt}
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
              className="w-full h-full object-cover break-inside-auto
"
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default Slider;
