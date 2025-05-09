"use client";
import { Card, CardContent } from "@/app/_components/ui/card";
import { BannerProps } from "../_services/banners-service";
import { formattedData, useBanners } from "../_viewmodels/useBanners";
import Image from "next/image";

const BannersList = () => {
  const { data: banners, isLoading, isError, error, refetch } = useBanners();

  console.log(banners);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {banners.map((banner: BannerProps) => (
        <Card key={banner.id} className="p-2 bg-white">
          <CardContent className="p-0 w-full">
            <div className="relative h-40 rounded-md overflow-hidden">
              <Image
                src={banner.image_url}
                alt="Banner"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <p>{banner.name}</p>
            <p>{formattedData(banner.created_at)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BannersList;
