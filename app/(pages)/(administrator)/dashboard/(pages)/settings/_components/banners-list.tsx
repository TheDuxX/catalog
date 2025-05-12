"use client";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import { BannerProps } from "../_services/banners-service";
import {
  formattedData,
  useBannerFunctions,
  useBanners,
  useBannersMutations,
} from "../_viewmodels/useBanners";
import Image from "next/image";
import { Switch } from "@/app/_components/ui/switch";
import { Button } from "@/app/_components/ui/button";

const BannersList = () => {
  const { data: banners, isLoading, isError, error, refetch } = useBanners();
  const { createBanner, deleteBanner, updateAllBanners } =
    useBannersMutations();
  const {
    editedBanners,
    setEditedBanners,
    updateEditedBanner,
    hasUnsavedChanges,
    setHasUnsavedChanges,
  } = useBannerFunctions();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <Card className="p-2 bg-white w-full">
        <CardContent className="p-2 w-full flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-between">
            <CardTitle>Banners</CardTitle>
            <Button
              onClick={() => {
                const payload = editedBanners.map((b) => ({
                  id: b.id,
                  is_visible: b.is_visible,
                  order: b.order,
                }));
                updateAllBanners.mutate(payload);
                setEditedBanners([]);
                setHasUnsavedChanges(false);
              }}
              className={hasUnsavedChanges ? "" : "hidden"}
            >
              Salvar alterações
            </Button>{" "}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {banners.map((banner: BannerProps) => (
              <div
                key={banner.id}
                className="relative h-28 shadow w-full rounded-md overflow-hidden"
              >
                <Image
                  src={banner.image_url}
                  alt="Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <Switch
                  checked={
                    editedBanners.find((b) => b.id === banner.id)?.is_visible ??
                    banner.is_visible
                  }
                  onCheckedChange={(checked) => {
                    updateEditedBanner(banner.id, { is_visible: checked });
                  }}
                  className="absolute top-2 right-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BannersList;
