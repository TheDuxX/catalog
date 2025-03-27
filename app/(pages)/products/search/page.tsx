"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "@/app/_components/list";
import SearchBar from "@/app/_components/search";
import { createSupabaseClient } from "@/app/_utils/supabase/client";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams!.get("query") || "";
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    const fetchProducts = async () => {
      setError(null);
      const supabase = createSupabaseClient();

      try {
        // Passo 1: Buscar produtos pelo nome
        const { data: productData, error: productError } = await supabase
          .from("product")
          .select("*, category:categoryId(name), mark:markId(name)")
          .ilike("name", `%${query}%`);

        if (productError) throw productError;

        // Passo 2: Buscar categorias e marcas relacionadas à pesquisa
        const [
          { data: categories, error: categoryError },
          { data: marks, error: markError },
        ] = await Promise.all([
          supabase.from("category").select("id").ilike("name", `%${query}%`),
          supabase.from("mark").select("id").ilike("name", `%${query}%`),
        ]);

        if (categoryError || markError) throw categoryError || markError;

        // Passo 3: Obter produtos que pertencem às categorias ou marcas encontradas
        const categoryIds = categories?.map((c) => c.id) || [];
        const markIds = marks?.map((m) => m.id) || [];

        const [
          { data: categoryProducts, error: categoryProductError },
          { data: markProducts, error: markProductError },
        ] = await Promise.all([
          categoryIds.length
            ? supabase.from("product").select("*").in("categoryId", categoryIds)
            : { data: [], error: null },
          markIds.length
            ? supabase.from("product").select("*").in("markId", markIds)
            : { data: [], error: null },
        ]);

        if (categoryProductError || markProductError)
          throw categoryProductError || markProductError;

        // Passo 4: Combinar os resultados e remover duplicatas
        const allProducts = [
          ...productData,
          ...categoryProducts,
          ...markProducts,
        ];

        // Remover duplicados usando Map (melhor performance que filter)
        const filteredProducts = Array.from(
          new Map(allProducts.map((p) => [p.id, p])).values()
        );

        setProducts(filteredProducts);
      } catch (err: any) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro ao carregar os produtos.");
      }

      setLoading(false);
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
            <ProductList/>
          ) : (
            !loading && <p>Nenhum produto encontrado.</p>
          )}
      </div>
    </div>
  );
}
