"use client";
import Item from "@/app/_components/item";
import { useHome } from "../_viewmodel/useHome";
import { Skeleton } from "@/app/_components/ui/skeleton";

const RecentProducts = () => {
  const { recentProducts, formattedPrice, isLoading } = useHome();

  if (isLoading)
    return (
      <div>
        <h2 className="font-semibold text-lg px-2">Produtos recentes</h2>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="min-h-[300px] w-full bg-white shadow"
            ></Skeleton>
          ))}
        </div>
      </div>
    );

  return (
    <>
      <h2 className="font-semibold text-lg px-2">Produtos recentes</h2>
      <div className="rounded-md flex gap-2 lg:max-w-[1150px] overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2">
        {recentProducts.slice(0, 5).map((product) => (
          <Item
            formattedPrice={formattedPrice(product.price)}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default RecentProducts;
