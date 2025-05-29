"use client";

import { useRouter } from "next/navigation";
import { addViews } from "../(pages)/(administrator)/dashboard/_services/product-service";

export const useItemService = () => {
  const route = useRouter();

  const handleClick = (productId: string) => {
    addViews(productId);
    route.push("/product/" + productId);
  };

  return { handleClick };
};
