import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Search = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <Input
        type="search"
        placeholder="Digite aqui sua pesquisa"
        className="rounded-full lg:min-h-12"
      />
      <Button className="rounded-full" >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
