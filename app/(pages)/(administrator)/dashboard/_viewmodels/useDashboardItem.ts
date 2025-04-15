"use client";

import { useEffect, useState } from "react";
import { useFilters } from "@/app/_utils/filters-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useProductRealtime } from "../_services/supabase-realtime";

export const useDashboardItem = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { itemOrientation, itemCount, sortOrder } = useFilters();
  const params = useSearchParams();
  const router = useRouter();

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch(`/api/filters?${params.toString()}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [params]);

  useProductRealtime((payload) => {
    console.log("Atualizando produtos...", payload);
    fetchProducts();
  });

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

  function handleProductClick(id: string) {
    router.push(`/dashboard/product/${id}`);
  }

  return {
    loading,
    itemOrientation,
    products: visibleProducts,
    hasProducts: sortedProducts.length > 0,
    handleProductClick,
  };
};

export const formattedPrice = (price: number) =>
  `R$ ${price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
