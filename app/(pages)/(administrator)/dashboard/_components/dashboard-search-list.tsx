"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import DashboardItem from "./dashboard-item";
import Filters from "./filters";
import {
  formattedPrice,
  useDashboardItem,
} from "../_viewmodels/useDashboardList";

interface SearchProductsParams {
  products: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    status: boolean;
    reference: string;
    date: Date;
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
  }[];
}

const DashboardList = ({ products }: SearchProductsParams) => {
  const { loading, itemOrientation, hasProducts } = useDashboardItem();
  formattedPrice;

  if (loading) {
    return (
      <Skeleton className="flex w-full gap-4 bg-white rounded-md shadow p-4">
        Carregando...
      </Skeleton>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row gap-2 justify-end">
        <Filters />
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 w-full gap-2">
        {products.map((product) => (
          <DashboardItem
            key={product.id}
            product={product}
            formattedPrice={formattedPrice(product.price)}
          />
        ))}
        {products.map((product) => (
          <DashboardItem
            key={product.id}
            product={product}
            formattedPrice={formattedPrice(product.price)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardList;
