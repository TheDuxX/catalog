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
import toast from "react-hot-toast";
import { Button } from "@/app/_components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
    onSuccess: (data) => {
      console.log(data.message); // deve imprimir: Categoria deletada com sucesso.
      queryclient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria deletada com sucesso.");
    },
    onError: (error) => {
      toast.error("Erro ao deletar categoria.");
      console.error("Erro ao deletar categoria:", error);
    },
  });

  return { createCategory, updateCategory, deleteCategory };
};

// DEFINIÇÃO DO DATA TABLE
export const categoriesSettingTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "product_count",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>();

  const categoriesColumns: ColumnDef<Category, unknown>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          className="p-0 hover:bg-transparent hover:text-inherit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "product_count",
      header: ({ column }) => (
        <Button
          className="p-0 hover:bg-transparent hover:text-inherit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produtos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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

  return {
    categoriesTable,
    isEditing,
    setIsEditing,
    editedName,
    setEditedName,
    editingId,
    setEditingId,
  };
};
