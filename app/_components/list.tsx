"use client";
import { useEffect, useState } from "react";
import Filters from "./filters";
import SearchBar from "@/app/_components/search";
import Item from "@/app/_components/item";
import { useFilters } from "@/app/_utils/filters-context";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { itemOrientation, itemCount, sortOrder } = useFilters();
  const params = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/filters?${params.toString()}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  return (
    <div className="flex flex-col gap-2 item w-full">
      <div className="flex md:flex-row flex-col md:p-0 px-2 gap-1 lg:gap-2">
        <SearchBar />
        <Filters />
      </div>
      <div
        className={` ${
          loading ? "w-full flex justify-center items-center" : ""
        } grid ${
          sortedProducts.length != 0
            ? `${
                itemOrientation
                  ? "grid-cols-1 gap-1"
                  : "lg:grid-cols-5 grid-cols-2 gap-2"
              }`
            : "w-full"
        }   `}
      >
        {loading ? (
          <div className="w-full text-2xl mt-5 font-medium justify-center items-center">
            <Loader2 size={40} className="w-full animate-spin" />
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="w-full text-center text-2xl mt-5 font-medium">
            <h2>Nenhum produto encontrado</h2>
          </div>
        ) : (
          sortedProducts
            .slice(0, itemCount)
            .map((product) => (
              <Item
                key={product.id}
                product={product}
                itemOrientation={itemOrientation}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
