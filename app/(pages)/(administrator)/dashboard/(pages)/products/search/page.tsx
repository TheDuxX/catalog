"use client";
import { Suspense } from "react";
import SearchResults from "../../../_components/search-results";

const DashboardSearchResults = () => {
  return (
    <>
      <Suspense>
        <SearchResults />
      </Suspense>
    </>
  );
};

export default DashboardSearchResults;
