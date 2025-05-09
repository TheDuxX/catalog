"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Category,
  categoryService,
  Mark,
  markService,
} from "../_services/filters-service";
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
    mutationFn: (data: { name: string }) => categoryService.create(data),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria criada com sucesso.");
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      categoryService.update({ id, name: data.name }),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria atualizada com sucesso.");
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => categoryService.remove(id),
    onSuccess: (data) => {
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
  const [categorySorting, setCategorySorting] = useState<SortingState>([
    {
      id: "product_count",
      desc: true,
    },
  ]);
  const [columnMarkFilters, setColumnMarkFilters] =
    useState<ColumnFiltersState>([]);
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editedCategoryName, setEditedCategoryName] = useState<string>();
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

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
    onColumnFiltersChange: setColumnMarkFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setCategorySorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: categorySorting,
      columnFilters: columnMarkFilters,
    },
  });

  return {
    categoriesTable,
    isCategoryEditing,
    setIsCategoryEditing,
    editingCategoryId,
    setEditingCategoryId,
    editedCategoryName,
    setEditedCategoryName,
    createNewCategory,
    setCreateNewCategory,
    newCategoryName,
    setNewCategoryName,
  };
};

export const useFiltersMark = () => {
  return useQuery({
    queryKey: ["marks"],
    queryFn: markService.getAll,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useMarksMutations = () => {
  const queryclient = useQueryClient();

  const createMark = useMutation({
    mutationFn: (data: { name: string }) => markService.create(data),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["marks"] });
      toast.success("Marca criada com sucesso.");
    },
  });

  const updateMark = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      markService.update({ id, name: data.name }),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["marks"] });
      toast.success("Marca atualizada com sucesso.");
    },
  });

  const deleteMark = useMutation({
    mutationFn: (id: string) => markService.remove(id),
    onSuccess: (data) => {
      queryclient.invalidateQueries({ queryKey: ["marks"] });
      toast.success("Marca deletada com sucesso.");
    },
    onError: (error) => {
      toast.error("Erro ao deletar marca.");
      console.error("Erro ao deletar marca:", error);
    },
  });

  return { createMark, updateMark, deleteMark };
};

export const marksSettingTable = () => {
  const [markSorting, setMarkSorting] = useState<SortingState>([
    {
      id: "product_count",
      desc: true,
    },
  ]);
  const [columnMarkFilters, setColumnMarkFilters] =
    useState<ColumnFiltersState>([]);
  const [isMarkEditing, setIsMarkEditing] = useState(false);
  const [editingMarkId, setEditingMarkId] = useState<string | null>(null);
  const [editedMarkName, setEditedMarkName] = useState<string>();
  const [createNewMark, setCreateNewMark] = useState(false);
  const [newMarkName, setNewMarkName] = useState<string>("");

  const marksColumns: ColumnDef<Mark, unknown>[] = [
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

  const marksTable = useReactTable({
    data: useFiltersMark().data || [],
    columns: marksColumns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    onColumnFiltersChange: setColumnMarkFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setMarkSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: markSorting,
      columnFilters: columnMarkFilters,
    },
  });

  return {
    marksTable,
    isMarkEditing,
    setIsMarkEditing,
    editingMarkId,
    setEditingMarkId,
    editedMarkName,
    setEditedMarkName,
    createNewMark,
    setCreateNewMark,
    newMarkName,
    setNewMarkName,
  };
};
