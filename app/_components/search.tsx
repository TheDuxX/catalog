"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex flex-row gap-2 w-full bg-white border border-solid rounded-md">
        <Input
          type="search"
          placeholder="Digite aqui sua pesquisa"
          value={searchTerm}
          onChange={handleSearch}
          className="border-none shadow-none"
        />
        <Button
          size="icon"
          className="aspect-square"
          variant="ghost"
          onClick={() =>
            router.push(`/products/search?query=${encodeURIComponent(searchTerm)}`)
          }
        >
          <SearchIcon size={18} />
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
