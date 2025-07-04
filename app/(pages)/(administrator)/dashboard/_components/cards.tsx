"use client";
import { BadgeDollarSign, BoxIcon, Eye, Plus } from "lucide-react";
import {
  trendingMarks,
  useActivitycards,
} from "../_viewmodels/useActivityCards";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

const MetricCards = () => {
  const router = useRouter();
  const {
    totalViews,
    totalOrders,
    totalProducts,
    viewsChange,
    ordersChange,
    loading,
  } = useActivitycards();

  if (loading)
    return (
      <div className="flex flex-row gap-2">
        <Skeleton className="w-full min-h-[108px] max-w-[300px] bg-white rounded-md shadow p-4 space-y-2  hover:shadow-lg transition-all">
          Carregando...
        </Skeleton>
        <Skeleton className="w-full min-h-[108px] max-w-[300px] bg-white rounded-md shadow p-4 space-y-2  hover:shadow-lg transition-all">
          Carregando...
        </Skeleton>
        <Skeleton className="w-full min-h-[108px] max-w-[300px] bg-white rounded-md shadow p-4 space-y-2  hover:shadow-lg transition-all">
          Carregando...
        </Skeleton>
      </div>
    );

  return (
    <div className="md:flex w-full md:flex-row grid grid-cols-2 gap-2">
      <div className="w-full max-w-[300px] bg-white rounded-md shadow md:p-4 p-2 space-y-2  hover:shadow-lg transition-all md:border-l-4 border-secondary">
        <div className={`flex flex-row items-center gap-2 `}>
          <Eye size={20} className="stroke-1" />
          <h3 className="text-lg font-medium">Visitas</h3>
        </div>
        <div className="flex flex-row gap-2 w-full justify-between items-baseline">
          <p className="md:text-4xl text-3xl font-bold">
            {totalViews.toLocaleString()}
          </p>
          {trendingMarks(viewsChange!)}
        </div>
        {/* <span className="text-gray-500 text-sm">Visualizações de página</span> */}
      </div>
      <div className="w-full max-w-[300px] bg-white rounded-md shadow md:p-4 p-2 space-y-2  hover:shadow-lg transition-all md:border-l-4 border-secondary">
        <div className="flex flex-row items-center gap-2">
          <BadgeDollarSign size={20} className="stroke-1" />
          <h3 className="text-lg font-medium">Pedidos</h3>
        </div>
        <div className="flex flex-row gap-2 w-full justify-between items-baseline">
          <p className="md:text-4xl text-3xl font-bold">
            {totalOrders.toLocaleString()}
          </p>
          {trendingMarks(ordersChange)}
        </div>
        {/* <span className="text-gray-500 text-sm">Pedidos realizados</span> */}
      </div>
      <div className="w-full max-w-[300px] bg-white rounded-md shadow md:p-4 p-2 space-y-2  hover:shadow-lg transition-all md:border-l-4 border-secondary">
        <div className="flex flex-row items-center gap-2">
          <BoxIcon size={20} className="stroke-1" />
          <h3 className="text-lg font-medium">Produtos</h3>
        </div>
        <div className="flex flex-row gap-2 w-full justify-between items-baseline">
          <p className="md:text-4xl text-3xl font-bold">{totalProducts}</p>
          <Button
            variant={"secondary"}
            className="aspect-square p-0"
            onClick={() => router.push("/dashboard/new-product")}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetricCards;
