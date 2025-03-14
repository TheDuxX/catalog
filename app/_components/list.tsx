"use client";
import { useEffect, useState } from "react";
import Item from "./item";
import { Button } from "./ui/button";
import { Columns, FilterIcon, Rows } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import { createSupabaseClient } from "../_utils/supabase/client";
import SearchBar from "./search";
import Filters from "./filters";

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
      <div className="flex md:flex-row flex-col px-2 justify-between gap-1 lg:gap-2 text-sm">
        <SearchBar />
        {/* <div className="flex flex-row gap-2 md:w-auto w-full justify-between">
          <select
            onChange={handleSortChange}
            value={sortOrder}
            className="rounded-md px-1 md:w-auto w-full bg-primary text-white"
          >
            <option value="ascending">Preço: Crescente</option>
            <option value="descending">Preço: Decrescente</option>
            <option value="alphabetical">Ordem alfabética</option>
          </select>
          <select
            onChange={handleSelectChange}
            value={itemCount}
            className="px-2 rounded-md bg-primary md:w-auto w-full text-white"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <Sheet>
            <SheetTrigger asChild className="flex items-center px-2 rounded-md bg-primary text-white">
              <div className="flex items-center md:w-auto w-full">
                <FilterIcon size={18} className="fill-white stroke-none" />
                Filtros
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="text-left space-y-1 border-solid border-b-[1px] pb-2">
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Selecione os filtros que deseja.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-2 flex flex-col">
                <h2 className="font-semibold">Status do Produto</h2>
                <RadioGroup defaultValue="all" onValueChange={setFilterStatus}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="activated" id="r1" />
                    <Label
                      htmlFor="r1"
                      className="text-sm leading-none font-normal"
                    >
                      Ativos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disabled" id="r2" />
                    <Label
                      htmlFor="r2"
                      className="text-sm leading-none font-normal"
                    >
                      Desativados
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r3" />
                    <Label
                      htmlFor="r3"
                      className="text-sm leading-none font-normal"
                    >
                      Todos
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-2 flex flex-col">
                <h2 className="font-semibold">Categorias</h2>
                {categories?.length > 0 ? (
                  categories.map((category) => (
                    <div className="flex gap-2 py-2" key={category.id}>
                      <Checkbox
                        id={category.id}
                        checked={selectedCategory === category.id}
                        onCheckedChange={() =>
                          setSelectedCategory(
                            selectedCategory === category.id ? null : category.id
                          )
                        }
                      />
                      <Label
                        htmlFor={category.id}
                        className="text-sm leading-none font-normal"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
              <div className="mt-2 flex flex-col">
                <h2 className="font-semibold">Marcas</h2>
                {marks?.length > 0 ? (
                  marks.map((mark) => (
                    <div className="flex gap-2 py-2" key={mark.id}>
                      <Checkbox
                        id={mark.id}
                        checked={selectedMark === mark.id}
                        onCheckedChange={() =>
                          setSelectedMark(
                            selectedMark === mark.id ? null : mark.id
                          )
                        }
                      />
                      <Label
                        htmlFor={mark.id}
                        className="text-sm leading-none font-normal"
                      >
                        {mark.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
              <SheetClose className="w-full flex justify-end">
                <Button className="mt-4" onClick={resetFilters}>
                  Limpar Filtros
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
          <Button
            onClick={toggleOrientation}
            className="p-2 h-auto aspect-square bg-primary text-white border-none"
            variant="outline"
          >
            {itemOrientation ? <Columns /> : <Rows />}
          </Button>
        </div> */}
        <Filters product={product}/>
      </div>
      <div
        className={`grid ${
          itemOrientation ? "grid-cols-1 gap-1" : "lg:grid-cols-5 grid-cols-2 gap-2"
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
