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
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedMarks: string[];
  setSelectedMarks: (marks: string[]) => void;
  filterStatus: string;
  setFilterStatus: (value: "all" | "active" | "disabled")=> void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [itemOrientation, setItemOrientation] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("date:desc");
  const [itemCount, setItemCount] = useState<number>(10);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMarks, setSelectedMarks] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "disabled">("active");

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedMarks([]);
    setFilterStatus("all");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) throw new Error("Erro ao buscar Categorias");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        setCategories([]);
      }
    };
    const fetchMarks = async () => {
      try {
        const response = await fetch("/api/mark");
        if (!response.ok) throw new Error("Erro ao buscar marcas");

        const data = await response.json();
        setMarks(data);
      } catch (error) {
        console.error(error);
        setMarks([]);
      }
    };

    fetchMarks();
    fetchCategories();
  }, []);

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
