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
  const [isMobile, setIsMobile] = useState(false);
  const [banners, setBanners] = useState<BannersProps[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      const supabase = createSupabaseClient();

      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .eq("is_visible", true) // Filtra banners visíveis
        .order("created_at", { ascending: false }); // Ordena pelos mais recentes

      if (error) {
        console.error("Erro ao buscar banners:", error);
        return;
      }

      if (data) {
        setBanners(data);
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
      showIndicators={isMobile ? false : true}
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
