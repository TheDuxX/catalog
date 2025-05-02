"use client";

import { useSearchParams } from "next/navigation";
import { useFilters } from "@/app/_utils/filters-context";
import { useQuery } from "@tanstack/react-query";
import { fetchFilterProducts } from "../_services/products-service";

export const useDashboardItem = () => {
  const { itemOrientation, itemCount, sortOrder } = useFilters();
  const params = useSearchParams();

  const paramsString = params?.toString() ?? "";

  const query = useQuery({
    queryKey: ["products", paramsString],
    queryFn: () => fetchFilterProducts(params!),
  });

  const products = query.data ?? [];

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortOrder) return 0;
    const [key, order] = sortOrder.split(":");

    const compareValues = (valA: any, valB: any) => {
      if (typeof valA === "string") {
        return valA.localeCompare(valB);
      }
      return valA - valB;
    };

    const valueA = a[key as keyof typeof a];
    const valueB = b[key as keyof typeof b];

    if (valueA === undefined || valueB === undefined) return 0;

    return order === "asc"
      ? compareValues(valueA, valueB)
      : compareValues(valueB, valueA);
  });

  const visibleProducts = sortedProducts.slice(0, itemCount);

  return {
    loading: query.isLoading,
    error: query.error,
    itemOrientation,
    products: visibleProducts,
    hasProducts: sortedProducts.length > 0,
    refetch: query.refetch,
  };
};

export const formattedPrice = (price: number) =>
  `R$ ${price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
