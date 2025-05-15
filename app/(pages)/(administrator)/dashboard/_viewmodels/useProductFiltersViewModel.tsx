// app/(pages)/(catalog)/_viewmodels/useProductFiltersViewModel.ts

import { useFilters } from "@/app/_utils/filters-context";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { categoryService } from "../(pages)/settings/_services/filters-service";

export const useProductFiltersViewModel = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMarks, setSelectedMarks] = useState<string[]>([]);

  const {
    itemOrientation,
    setItemOrientation,
    sortOrder,
    setSortOrder,
    itemCount,
    setItemCount,
    filterStatus,
    setFilterStatus,
  } = useFilters();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: marks,
    isLoading: isLoadingMarks,
    isError: isErrorMarks,
    error: errorMarks,
    refetch: refetchMarks,
  } = useQuery({
    queryKey: ["marks"],
    queryFn: () => categoryService.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

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
    isLoadingCategories,
    isErrorCategories,
    errorCategories,
    refetchCategories,
    marks,
    isLoadingMarks,
    isErrorMarks,
    errorMarks,
    refetchMarks,
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
