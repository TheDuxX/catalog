"use client";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { createSupabaseClient } from "@/app/_utils/supabase/client";

const ResponsiveCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [bannerImages, setBannerImages] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const supabase = createSupabaseClient();

    const fetchImages = async () => {
      const { data: imageUrls, error } = await supabase
        .from("banners")
        .select("*");

      if (error) {
        console.error("Erro ao buscar imagens:", error);
        return;
      }

      setBannerImages(imageUrls);
      console.log(imageUrls);
    };

    fetchImages();
  }, []);

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
      {bannerImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          className="w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ResponsiveCarousel;
