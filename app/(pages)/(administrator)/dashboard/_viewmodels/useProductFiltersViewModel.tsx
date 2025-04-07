// app/(pages)/(catalog)/_viewmodels/useProductFiltersViewModel.ts

import { useFilters } from "@/app/_utils/filters-context";

export const useProductFiltersViewModel = () => {
  const {
    categories,
    marks,
    itemOrientation,
    setItemOrientation,
    sortOrder,
    setSortOrder,
    itemCount,
    setItemCount,
    selectedCategories,
    setSelectedCategories,
    selectedMarks,
    setSelectedMarks,
    filterStatus,
    setFilterStatus,
  } = useFilters();

  const toggleOrientation = () => setItemOrientation(!itemOrientation);

  const handleFilterApply = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length) {
      params.set("category", selectedCategories.join(","));
    }
    if (selectedMarks.length) {
      params.set("mark", selectedMarks.join(","));
    }
    if (filterStatus && filterStatus !== "all") {
      params.set("status", filterStatus);
    }

    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams();

    setSelectedCategories([]);
    setSelectedMarks([]);
    setFilterStatus("all");
    setSortOrder("price:asc");

    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return {
    categories,
    marks,
    itemOrientation,
    sortOrder,
    itemCount,
    selectedCategories,
    selectedMarks,
    filterStatus,
    toggleOrientation,
    setSortOrder,
    setItemCount,
    handleFilterApply,
    handleResetFilters,
    setSelectedCategories,
    setSelectedMarks,
  };
};
