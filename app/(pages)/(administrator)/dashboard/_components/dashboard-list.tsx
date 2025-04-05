"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  formattedPrice,
  useDashboardItem,
} from "../_viewmodels/useDashboardItem";
import DashboardItem from "./dashboard-item";
import DashboardSearch from "./dashboard-search";
import Filters from "@/app/_components/filters";

const DashboardList = () => {
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 justify-end">
        {/* <DashboardSearch /> */}
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
