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
      src: "/logo.png",
      alt: "Logo 1",
    },
    {
      id: 2,
      name: "Fiat",
      src: "/logo.png",
      alt: "Logo 2",
    },
  ];

  return (
    <>
      <Carousel
        className="w-full h-full rounded-md shadow-md p-2"
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
              className="object-contain object-center rounded-md"
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
