"use client";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useIsMobile } from "@/app/_lib/useIsMobile";

type BannersProps = {
  id?: string;
  name: string;
  image_url: string;
  is_visible: boolean;
  created_at: Date;
};

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    description: string;
    reference: string;
    status: boolean;
    date: Date;
    price: number;
    categoryId: string;
    markId: string;
    imageUrls: string[];
    views: number | null;
    category: {
      id: string;
      name: string;
    };
    mark: {
      id: string;
      name: string;
    };
  };
}

const ResponsiveCarousel = ({ product }: ProductItemProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isMobile = useIsMobile();

  return (
    <div className={`flex gap-4 lg:flex-row flex-col-reverse`}>
      {/* Miniaturas na esquerda */}
      <div className={`flex gap-2 w-20 ${isMobile ? "flex-row" : "flex-col"}`}>
        {product.imageUrls.map((src, index) => (
          <img
            key={index}
            src={src}
            className={`w-16 h-16 object-cover cursor-pointer rounded-md ${
              selectedIndex === index ? "border border-secondary" : ""
            }`}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* Carrossel ocupando o restante do espaço */}
      <div className="flex-1">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          stopOnHover
          showArrows
          showStatus={false}
          showIndicators
          emulateTouch
          selectedItem={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
        >
          {product.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={product.name}
              className="w-full object-cover"
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ResponsiveCarousel;
