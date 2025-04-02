"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  formattedPrice,
  useDashboardItem,
} from "../_viewmodels/useDashboardItem";
import DashboardItem from "./dashboard-item";

const DashboardMostView = () => {
  const { products, loading } = useDashboardItem();
  formattedPrice;

  if (loading) {
    return (
      <Skeleton className="flex w-full gap-4 bg-white rounded-md shadow p-4">
        Carregando...
      </Skeleton>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-lg">Adicionados Recentemente</h2>
      <div className="pl-1 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden py-2">
        <div className="flex flex-row gap-2 w-1/6">
          {products.slice(0, 10).map((product) => (
            <DashboardItem
              key={product.id}
              product={product}
              formattedPrice={formattedPrice(product.price)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMostView;
