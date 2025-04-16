"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { useDashboardItem } from "../_viewmodels/useDashboardList";
import { useItemService } from "../_viewmodels/useItemService";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    reference: string;
    status: boolean;
    date: Date;
    price: number;
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
  formattedPrice: string;
}

const DashboardItem = ({ product, formattedPrice }: ProductProps) => {
  const { handleClick } = useItemService();

  return (
    <Card
      className="p-0 md:min-w-[100px] w-full bg-white hover:shadow-md hover:translate-y-[-5px] transition-all cursor-pointer"
      onClick={() => handleClick(product.id)}
    >
      <CardContent className={`p-1 flex flex-col justify-between`}>
        <div
          className={`relative min-w-[100px] w-full aspect-square rounded-md`}
        >
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className={` flex flex-col  gap-2 px-2`}>
          <div className="flex flex-col gap-0">
            <h2 className={`md:font-medium line-clamp-1 md:text-lg`}>
              {product.name}
            </h2>
            <small className="text-secondary">
              {product.mark ? product.mark.name : "Marca não disponível"}
            </small>
          </div>
          <h3
            className={`scroll-m-20 text-sm md:text-base lg:text-lg sm:font-semibold tracking-tight`}
          >
            {formattedPrice}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardItem;
