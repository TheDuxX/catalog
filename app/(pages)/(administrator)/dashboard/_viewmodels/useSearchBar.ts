import { useState } from "react";
import { useRouter } from "next/navigation";

export const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() === "") return;

    router.push(`/dashboard/products/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return {
    searchTerm,
    handleSearchChange,
    handleSearchSubmit,
  };
};
