"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchSearchResults } from "../_services/search-service";
export const useSearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams!.get("query") || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        const data = await fetchSearchResults(query);
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return { query, products, loading };
};
