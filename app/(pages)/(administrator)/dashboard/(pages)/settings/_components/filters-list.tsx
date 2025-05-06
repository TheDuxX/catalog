"use client";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  categoriesSettingTable,
  useCategoriesMutations,
  useFiltersCategory,
} from "../_viewmodels/useFilters";
import { Separator } from "@/app/_components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";

const SettingsFilters = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = useFiltersCategory();

  const { categoriesTable } = categoriesSettingTable();

  const { createCategory, updateCategory, deleteCategory } =
    useCategoriesMutations();

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4 ">
      <Card className="bg-white w-full">
        <CardContent className="p-4 flex flex-col gap-2">
          <CardHeader className="font-semibold p-0">Categorias</CardHeader>
          <Separator className="bg-black/10" />
          <Table className="w-full">
            <TableHeader>
              {categoriesTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                  <TableHead>Ações</TableHead>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="">
              {categoriesTable.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell className="p-0 ">
                      <Button
                        variant={"button"}
                        onClick={() => {
                          console.log("Teste de botão", row.id);
                          deleteCategory.mutate(row.id);
                        }}
                        className="hover:text-red-500 p-0"
                      >
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-0">
          <CardHeader className="font-semibold">Marcas</CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsFilters;
