"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Filters from "./filters";
import { createSupabaseClient } from "@/app/_utils/supabase/client";
import SearchBar from "@/app/_components/search";
import Item from "@/app/_components/item";

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
  const [itemOrientation, setItemOrientation] = useState(false); // Salva o valor da orientação
  const [itemCount, setItemCount] = useState(10); // Estado para armazenar o valor selecionado de quantidade de produtos mostrados
  const [sortOrder, setSortOrder] = useState("ascending"); // Salva a ordenação da lista de produtos
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMark, setSelectedMark] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const supabase = createSupabaseClient();

    const fetchCategoriesAndMarks = async () => {
      try {
        const [
          { data: categories, error: categoriesError },
          { data: marks, error: marksError },
        ] = await Promise.all([
          supabase.from("category").select("id, name"),
          supabase.from("mark").select("id, name"),
        ]);

        if (categoriesError || marksError) {
          toast("Erro ao tentar buscar Categorias ou Marcas.");
          return;
        }

        setCategories(categories || []);
        setMarks(marks || []);
      } catch (error) {
        toast("Erro ao tentar buscar Categorias ou Marcas.");
      }
    };

    fetchCategoriesAndMarks();
  }, []);

  const toggleOrientation = () => {
    setItemOrientation(!itemOrientation);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemCount(parseInt(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedMark(null);
    setFilterStatus("all");
  };

  const filteredProducts = product.filter((p) => {
    const statusMatches =
      filterStatus === "all" ||
      (filterStatus === "activated" && p.status) ||
      (filterStatus === "disabled" && !p.status);
    const categoryMatches =
      !selectedCategory || p.categoryId === selectedCategory;
    const markMatches = !selectedMark || p.markId === selectedMark;

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
