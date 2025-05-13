"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useBannersViewModel } from "@/app/(pages)/(administrator)/dashboard/(pages)/settings/_viewmodels/useBanners";
import { Skeleton } from "@/app/_components/ui/skeleton";

const ResponsiveCarousel = () => {
  const { banners, isLoading, error } = useBannersViewModel();

  if (isLoading && !banners) return;
  if (error) return;

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
