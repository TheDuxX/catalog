"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";

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
  return (
    <Card className="p-0 min-w-[180px] lg:min-w-[240px] bg-white">
      <CardContent className={`p-1 flex flex-col justify-between`}>
        <div className={`relative min-w-[150px] aspect-square rounded-md`}>
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={` flex flex-col  gap-2 px-2`}>
          <div className="flex flex-col gap-0">
            <h2 className={`font-medium line-clamp-1 text-lg`}>
              {product.name}
            </h2>
            <small className="text-secondary">
              {product.mark ? product.mark.name : "Marca não disponível"}
            </small>
          </div>
          <h3
            className={`scroll-m-20 text-lg lg:text-2xl font-semibold tracking-tight`}
          >
            {formattedPrice}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardItem;
