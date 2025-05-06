"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, categoryService } from "../_services/filters-service";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

// CATEGORIAS
export const useFiltersCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useCategoriesMutations = () => {
  const queryclient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      categoryService.update({ id, name: data.name }),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => categoryService.remove(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { createCategory, updateCategory, deleteCategory };
};

// DEFINIÇÃO DO DATA TABLE
export const categoriesSettingTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const categoriesColumns: ColumnDef<Category, unknown>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "product_count",
      header: "Produtos",
    },
  ];

  const categoriesTable = useReactTable({
    data: useFiltersCategory().data || [],
    columns: categoriesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return { categoriesTable };
};
