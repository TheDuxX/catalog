"use client";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { createSupabaseClient } from "@/app/_utils/supabase/client";

type BannersProps = {
  id?: string;
  name: string;
  image_url: string;
  is_visible: boolean;
  created_at: Date;
};

const ResponsiveCarousel = () => {
  const [banners, setBanners] = useState<BannersProps[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      autoPlay
      stopOnHover
      showArrows={false}
      showStatus={false}
      emulateTouch
      className="lg:max-w-[1150px] lg:max-h-[240px] sm:max-w-full sm:max-h-[160px] rounded-md overflow-hidden p-0 shadow "
    >
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner.image_url}
          alt={banner.name}
          className="w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ResponsiveCarousel;
