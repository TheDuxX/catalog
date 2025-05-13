import SearchResults from "@/app/(pages)/(administrator)/dashboard/_components/search-results";
import SearchBar from "@/app/_components/search";

const SearchPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <div className="w-full max-w-[1150px]">
        <SearchBar />
        <SearchResults />
      </div>
    </div>
  );
};

export default SearchPage;
