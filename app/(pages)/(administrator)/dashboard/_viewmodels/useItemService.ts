"use client";

import { useRouter } from "next/navigation";

export const useItemService = () => {
  const route = useRouter();

  const handleClick = (productId: string) => {
    route.push("/dashboard/product/" + productId);
  };

  return { handleClick };
};
