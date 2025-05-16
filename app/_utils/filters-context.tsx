"use client";
import { createContext, useContext, useState } from "react";

interface FiltersContextProps {
  itemOrientation: boolean;
  setItemOrientation: (value: boolean) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  itemCount: number;
  setItemCount: (value: number) => void;
  filterStatus: string;
  setFilterStatus: (value: "all" | "active" | "disabled")=> void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [itemOrientation, setItemOrientation] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("date:desc");
  const [itemCount, setItemCount] = useState<number>(10);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "disabled">("active");

  return (
    <FiltersContext.Provider
      value={{
        itemOrientation,
        setItemOrientation,
        sortOrder,
        setSortOrder,
        itemCount,
        setItemCount,
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
