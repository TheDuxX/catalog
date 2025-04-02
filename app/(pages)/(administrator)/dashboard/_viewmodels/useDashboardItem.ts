"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../_services/products-service";

export const useDashboardItem = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await fetchProducts();

        const sortedProducts = [...productData!].sort(
          (a, b) => (b.views || 0) - (a.views || 0)
        );

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    products,
    loading,
  };
};

export const formattedPrice = (price: number) => 
  `R$ ${price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
