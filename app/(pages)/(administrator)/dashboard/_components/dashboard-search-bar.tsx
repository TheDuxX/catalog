"use client";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSearchBar } from "../_viewmodels/useSearchBar";

const SearchBar = () => {
  const { searchTerm, handleSearchChange, handleSearchSubmit } = useSearchBar();

  return (
    <div className="flex flex-row gap-2 w-full bg-white border border-solid rounded-full px-2 items-center justify-between">
      <Input
        type="search"
        placeholder="Digite aqui sua pesquisa"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border-none shadow-none w-full placeholder:text-base"
      />
      <SearchIcon
        size={24}
        className="mx-2 cursor-pointer"
        onClick={handleSearchSubmit}
      />
    </div>
  );
};

export default SearchBar;
