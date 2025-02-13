"use client";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BrandTags = () => {
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
    {
      id: 3,
      name: "John Deer",
      src: "/logo.png",
      alt: "Logo 3",
    },
    { id: 4, name: "Fiat", src: "/logo.png", alt: "Logo 4" },
  ];

  const route = useRouter();

  return (
    <div className="flex flex-row gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden justify-center">
      {images.map((image) => (
        <Button
          key={image.id}
          onClick={() => route.push(`/search/${image.name}`)}
          className="relative w-[100px] h-[100px] rounded-full border p-2"
        >
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain p-2 rounded-full bg-white"
          />
        </Button>
      ))}
    </div>
  );
};

export default BrandTags;
