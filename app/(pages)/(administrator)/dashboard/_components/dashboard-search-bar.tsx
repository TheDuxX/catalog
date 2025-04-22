"use client";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSearchBar } from "../_viewmodels/useSearchBar";
import { Button } from "@/app/_components/ui/button";

const SearchBar = () => {
  const { searchTerm, handleSearchChange, handleSearchSubmit } = useSearchBar();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit();
      }}
      className="w-full"
    >
      <div
        className="flex items-center gap-2
          w-full
          rounded-full
          border border-input
          bg-white
          px-2
          shadow-sm
          transition
          focus-within:ring-1 focus-within:ring-ring focus-within:border-ring"
      >
        <Input
          type="search"
          placeholder="Digite sua pesquisa"
          value={searchTerm}
          onChange={handleSearchChange}
          className="
          flex-1
          border-none
          outline-none
          ring-0
          shadow-none
          placeholder:text-base
          text-sm
          bg-transparent
        "
          aria-label="Barra de pesquisa"
        />
        <Button
          type="submit"
          aria-label="Buscar"
          variant={"ghost"}
          className="
            p-2 rounded-full hover:bg-muted transition-colors
            text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring
          "
        >
          <SearchIcon size={24} className="mx-2 cursor-pointer" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
