"use client";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  categoriesSettingTable,
  marksSettingTable,
  useCategoriesMutations,
  useFiltersCategory,
  useMarksMutations,
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
import { Input } from "@/app/_components/ui/input";

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
    isCategoryEditing,
    setIsCategoryEditing,
    editingCategoryId,
    setEditingCategoryId,
    editedCategoryName,
    setEditedCategoryName,
  } = categoriesSettingTable();

  const {
    marksTable,
    isMarkEditing,
    setIsMarkEditing,
    editingMarkId,
    setEditingMarkId,
    editedMarkName,
    setEditedMarkName,
  } = marksSettingTable();

  const { createCategory, updateCategory, deleteCategory } =
    useCategoriesMutations();

  const { createMark, updateMark, deleteMark } = useMarksMutations();

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4 ">
      <Card className="bg-white w-full h-fit">
        <CardContent className="p-4 flex flex-col gap-2">
          <CardHeader className="font-semibold p-0">Categorias</CardHeader>
          <Table className="w-full rounded-md overflow-hidden">
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
                const isEditing = editingCategoryId === category.id;

                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id;

                      if (columnId === "name") {
                        return (
                          <TableCell key={cell.id}>
                            {isEditing ? (
                              <Input
                                type="text"
                                className="border rounded px-2 py-1 w-full"
                                value={editedCategoryName}
                                onChange={(e) =>
                                  setEditedCategoryName(e.target.value)
                                }
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
                                data: { name: editedCategoryName ?? "" },
                              });
                              setEditingCategoryId(null);
                              setEditedCategoryName("");
                            }}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="button"
                            size="icon"
                            className="hover:text-secondary"
                            onClick={() => {
                              setEditingCategoryId(null); // cancela edição
                              setEditedCategoryName(""); // limpa valor temporário
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
                              setEditingCategoryId(category.id); // ativa edição apenas para essa linha
                              setEditedCategoryName(category.name); // inicializa com o nome atual
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
      <Card className="bg-white w-full h-fit">
        <CardContent className="p-4 flex flex-col gap-2">
          <CardHeader className="font-semibold p-0">Marcas</CardHeader>
          <Table className="w-full rounded-md overflow-hidden">
            <TableHeader className="px-2 w-full">
              {marksTable.getHeaderGroups().map((headerGroup) => (
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
              {marksTable.getRowModel().rows.map((row) => {
                const mark = row.original;
                const isEditing = editingMarkId === mark.id;

                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id;

                      if (columnId === "name") {
                        return (
                          <TableCell key={cell.id}>
                            {isEditing ? (
                              <Input
                                type="text"
                                className="border rounded px-2 py-1 w-full"
                                value={editedMarkName}
                                onChange={(e) =>
                                  setEditedMarkName(e.target.value)
                                }
                              />
                            ) : (
                              <span>{mark.name}</span>
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
                              updateMark.mutate({
                                id: mark.id,
                                data: { name: editedMarkName ?? "" },
                              });
                              setEditingMarkId(null);
                              setEditedMarkName("");
                            }}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="button"
                            size="icon"
                            className="hover:text-secondary"
                            onClick={() => {
                              setEditingMarkId(null);
                              setEditedMarkName("");
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
                              deleteMark.mutate(row.original.id);
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
                              setEditingMarkId(mark.id);
                              setEditedMarkName(mark.name);
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
    </div>
  );
};

export default SettingsFilters;
