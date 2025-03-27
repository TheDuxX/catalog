"use client";
import { useState, useEffect } from "react";
import { fetchProducts } from "../_services/product-service";

export const useProductListViewModel = (query: string) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(query);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [query]);

  return { products, loading };
};
