"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Filters from "./filters";
import { createSupabaseClient } from "@/app/_utils/supabase/client";
import SearchBar from "@/app/_components/search";
import Item from "@/app/_components/item";
import { useFilters } from "@/app/_utils/filters-context";

interface ProductListProps {
  product: {
    id: string;
    name: string;
    description: string;
    reference: string;
    status: boolean;
    date: Date;
    price: number;
    categoryId: string;
    markId: string;
    imageUrls: string[];
    views: number | null;
    category: {
      id: string;
      name: string;
    };
    mark: {
      id: string;
      name: string;
    };
  }[];
}

interface Category {
  id: string;
  name: string;
}

interface Mark {
  id: string;
  name: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const { itemOrientation ,itemCount } = useFilters();

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams();

      try {
        const response = await fetch(`/api/products/filter?${params.toString()}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2 item">
      <div className="flex md:flex-row flex-col md:p-0 px-2 gap-1 lg:gap-2">
        <SearchBar />
        <Filters />
      </div>
      <div
        className={`grid ${
          itemOrientation
            ? "grid-cols-1 gap-1"
            : "lg:grid-cols-5 grid-cols-2 gap-2"
        } `}
      >
        {products.slice(0, itemCount).map((product) => (
          <Item
            key={product.id}
            product={product}
            itemOrientation={itemOrientation}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
