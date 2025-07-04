"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Loader2 } from "lucide-react";
import {
  formattedPrice,
  useDashboardItem,
} from "../(pages)/(administrator)/dashboard/_viewmodels/useDashboardList";
import Filters from "../(pages)/(administrator)/dashboard/_components/filters";
import Item from "./item";
import SearchBar from "./search";
import { Suspense } from "react";

const List = () => {
  const { loading, products } = useDashboardItem();

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-2 ">
        <div className="flex flex-row gap-2 justify-end">
          <Skeleton className="h-8 w-40 bg-white shadow"></Skeleton>
          <Skeleton className="h-8 w-20 bg-white shadow"></Skeleton>
        </div>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 w-full gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="md:min-w-[100px] w-full h-[350px] bg-white shadow flex items-center justify-center"
            >
              <Loader2 className="w-6 h-6 animate-spin text-primary/30" />
            </Skeleton>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex flex-row gap-2 justify-end">
        <Suspense>
          <SearchBar />
        </Suspense>
        <Filters />
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 w-full gap-2">
        {products.map((product) => (
          <Item
            key={product.id}
            product={product}
            formattedPrice={formattedPrice(product.price)}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
