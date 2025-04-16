"use client";

import { useEffect, useState } from "react";
import { useFilters } from "@/app/_utils/filters-context";
import { useSearchParams } from "next/navigation";
import { fetchFilterProducts } from "../_services/products-service";

export const useDashboardItem = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { itemOrientation, itemCount, sortOrder } = useFilters();
  const params = useSearchParams();

  useEffect(() => {
    const fetchProductsList = async () => {
      setLoading(true);
      try {
        const data = await fetchFilterProducts(params);
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsList();
  }, [params]);

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
    loading,
    itemOrientation,
    products: visibleProducts,
    hasProducts: sortedProducts.length > 0,
  };
};

export const formattedPrice = (price: number) =>
  `R$ ${price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
