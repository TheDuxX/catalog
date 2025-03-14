"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Mark {
  id: string;
  name: string;
}

interface FiltersContextProps {
  categories: Category[];
  marks: Mark[];
  itemOrientation: boolean;
  setItemOrientation: (value: boolean) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  itemCount: number;
  setItemCount: (value: number) => void;
  selectedCategories: Set<string>;
  setSelectedCategories: (value: Set<string>) => void;
  selectedMarks: Set<string>;
  setSelectedMarks: (value: Set<string>) => void;
  filterStatus: string;
  setFilterStatus: (value: "all" | "activated" | "disabled")=> void;
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [itemOrientation, setItemOrientation] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("ascending");
  const [itemCount, setItemCount] = useState<number>(10);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedMarks, setSelectedMarks] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<"all" | "activated" | "disabled">("all");

  const resetFilters = () => {
    setSelectedCategories(new Set());
    setSelectedMarks(new Set());
    setFilterStatus("all");
  };

  // useEffect(() => {
  //   const fetchCategoriesAndMarks = async () => {
  //     try {
  //       const response = await fetch("/api/categories");
  //       if (!response.ok) throw new Error("Erro ao buscar Categorias e Marcas");

  //       const data = await response.json();
  //       console.log("teste",data);
  //       setCategories(data.categories);
  //       setMarks(data.marks);
  //     } catch (error) {
  //       console.error(error);
  //       setCategories([]);
  //       setMarks([]);
  //     }
  //   };

  //   fetchCategoriesAndMarks();
  // }, []);

  return (
    <FiltersContext.Provider
      value={{
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
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters deve ser usado dentro de um FiltersProvider");
  }
  return context;
};
