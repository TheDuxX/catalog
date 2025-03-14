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

const ProductList = ({ product }: ProductListProps) => {
  const {
    categories,
    marks,
    itemOrientation,
    setItemOrientation,
    sortOrder,
    setSortOrder,
    itemCount,
    setItemCount,
    selectedCategories,
    setSelectedCategories,
    selectedMarks,
    setSelectedMarks,
    filterStatus,
    setFilterStatus,
    resetFilters,
  } = useFilters();

  console.log({
    categories,
    marks,
    itemOrientation,
    sortOrder,
    itemCount,
    selectedCategories,
    selectedMarks,
    filterStatus,
  });

  const filteredProducts = (product || []).filter((p) => {
    const statusMatches =
      !filterStatus ||
      filterStatus === "all" ||
      (filterStatus === "activated" && p.status) ||
      (filterStatus === "disabled" && !p.status);
    const categoryMatches =
      !selectedCategories || p.categoryId === selectedCategories;
    const markMatches = !selectedMarks || p.markId === selectedMarks;

    return statusMatches && categoryMatches && markMatches;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.price - b.price;
    } else if (sortOrder === "descending") {
      return b.price - a.price;
    } else if (sortOrder === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-2 item">
      <div className="flex md:flex-row flex-col md:p-0 px-2 gap-1 lg:gap-2">
        <SearchBar />
        <Filters product={product} />
      </div>
      <div
        className={`grid ${
          itemOrientation
            ? "grid-cols-1 gap-1"
            : "lg:grid-cols-5 grid-cols-2 gap-2"
        } `}
      >
        {sortedProducts.slice(0, itemCount).map((product) => (
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
