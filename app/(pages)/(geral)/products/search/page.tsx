import SearchResults from "@/app/(pages)/(administrator)/dashboard/_components/search-results";
import SearchBar from "@/app/_components/search";
import { Suspense } from "react";

const SearchPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <div className="w-full max-w-[1150px]">
        <Suspense>
          <SearchBar />
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;
