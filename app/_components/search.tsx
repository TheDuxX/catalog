"use client";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex flex-row gap-2 w-full bg-white border border-solid rounded-full px-2 items-center justify-between">
        <Input
          type="search"
          placeholder="Digite aqui sua pesquisa"
          value={searchTerm}
          onChange={handleSearch}
          className="border-none shadow-none w-full placeholder:text-base"
          aria-details="search"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              router.push(
                `/products/search?query=${encodeURIComponent(searchTerm)}`
              );
            }
          }}
        />
        <SearchIcon
          size={24}
          className="mx-2"
          onClick={() =>
            router.push(
              `/products/search?query=${encodeURIComponent(searchTerm)}`
            )
          }
        />
      </div>
    </>
  );
};

export default SearchBar;
