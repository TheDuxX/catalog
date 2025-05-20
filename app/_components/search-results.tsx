"use client";

import { useSearchResults } from "../(pages)/(administrator)/dashboard/_viewmodels/useSearchResults";
import SearchList from "./search-list";

const SearchResults = () => {
  const { products, loading } = useSearchResults();

  console.log("Produtos encontrados: ", products);

  return (
    <>
      <div className="p-2 flex flex-col w-full justify-start items-start">
        {loading && <p>Carregando...</p>}
        {!loading && products?.length ? (
          <SearchList products={products} />
        ) : (
          !loading && <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
