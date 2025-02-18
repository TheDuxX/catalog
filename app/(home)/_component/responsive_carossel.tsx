"use client";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ResponsiveCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = [
    {
      name: "Banner 1",
      src: isMobile ? "/banner1-sm.png" : "/banner1-lg.png",
    },
    {
      name: "Banner 2",
      src: isMobile ? "/banner1-sm.png" : "/banner1-lg.png",
    },
  ];

  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      autoPlay
      stopOnHover
      showArrows={false}
      showStatus={false}
      showIndicators={isMobile ? false : true}
      emulateTouch
      className="lg:max-w-[1150px] lg:max-h-[240px] sm:max-w-full sm:max-h-[160px] rounded-md overflow-hidden p-0 shadow"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.name}
          className="w-[1150px]"
        />
      ))}
    </Carousel>
  );
};

export default ResponsiveCarousel;
