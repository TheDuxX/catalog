"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/app/_components/search";
import { createSupabaseClient } from "@/app/_utils/supabase/client";
import ProductList from "./list";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams!.get("query") || "";
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?query=${query}`);
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        const data = await res.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="p-2 flex flex-col w-full justify-center items-center">
      <div className="max-w-[1150px] w-full flex gap-2 flex-col">
        <div className="w-full bg-primary text-primary-foreground rounded-sm shadow-sm p-1">
          <h2 className="text-center">Resultados para "{query}"</h2>
        </div>
        {loading && <p>Carregando...</p>}
        {!loading && error && <p className="text-red-500">{error}</p>}
        {!loading && !error && products?.length ? (
          <ProductList products={products} />
        ) : (
          !loading && <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}
