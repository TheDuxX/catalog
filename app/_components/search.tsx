import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Search = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 border border-solid rounded-md bg-white pr-2">
      <Input
        type="search"
        placeholder="Busque aqui a peça que deseja"
        className="border-none shadow-none active:"
      />
      <Button variant="ghost" className="hover:bg-transparent hover:text-accent-foreground">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
