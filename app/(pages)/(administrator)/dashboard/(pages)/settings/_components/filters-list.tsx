"use client";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  categoriesSettingTable,
  useCategoriesMutations,
  useFiltersCategory,
} from "../_viewmodels/useFilters";
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
import { Check, CircleX, Pencil, PencilIcon, Trash2Icon } from "lucide-react";

const SettingsFilters = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = useFiltersCategory();

  const {
    categoriesTable,
    isEditing,
    setIsEditing,
    editedName,
    setEditedName,
    editingId,
    setEditingId,
  } = categoriesSettingTable();

  const { createCategory, updateCategory, deleteCategory } =
    useCategoriesMutations();

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4 ">
      <Card className="bg-white w-full h-fit">
        <CardContent className="p-4 flex flex-col gap-2">
          <CardHeader className="font-semibold p-0">Categorias</CardHeader>
          <Table className="w-full">
            <TableHeader className="px-2 w-full">
              {categoriesTable.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-primary/20 rounded-full overflow-hidden"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-black font-semibold italic "
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                  <TableHead className="text-black font-semibold italic ">
                    Ações
                  </TableHead>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="">
              {categoriesTable.getRowModel().rows.map((row) => {
                const category = row.original;
                const isEditing = editingId === category.id;

                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id;

                      if (columnId === "name") {
                        return (
                          <TableCell key={cell.id}>
                            {isEditing ? (
                              <input
                                type="text"
                                className="border rounded px-2 py-1 w-full"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                              />
                            ) : (
                              <span>{category.name}</span>
                            )}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}

                    <TableCell className="p-0 flex gap-2">
                      {isEditing ? (
                        <div>
                          <Button
                            variant="button"
                            size="icon"
                            onClick={() => {
                              updateCategory.mutate({
                                id: category.id,
                                data: { name: editedName ?? "" },
                              });
                              setEditingId(null);
                              setEditedName("");
                            }}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="button"
                            size="icon"
                            className="hover:text-secondary"
                            onClick={() => {
                              setEditingId(null); // cancela edição
                              setEditedName(""); // limpa valor temporário
                            }}
                          >
                            <CircleX className="text-red-500" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Button
                            variant={"button"}
                            onClick={() => {
                              console.log("Teste de botão", row.original.id);
                              deleteCategory.mutate(row.original.id);
                            }}
                            className="hover:text-red-500 p-0"
                          >
                            <Trash2Icon />
                          </Button>
                          <Button
                            variant="button"
                            size="icon"
                            className="hover:text-secondary"
                            onClick={() => {
                              setEditingId(category.id); // ativa edição apenas para essa linha
                              setEditedName(category.name); // inicializa com o nome atual
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="bg-white h-fit">
        <CardContent className="p-0">
          <CardHeader className="font-semibold">Marcas</CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsFilters;
