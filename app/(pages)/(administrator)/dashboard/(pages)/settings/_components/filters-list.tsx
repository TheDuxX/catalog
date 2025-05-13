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
import {
  Check,
  CircleX,
  Pencil,
  PencilIcon,
  Plus,
  PlusCircleIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

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
    createNewCategory,
    setCreateNewCategory,
    newCategoryName,
    setNewCategoryName,
  } = categoriesSettingTable();

  const {
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
  } = marksSettingTable();

  const { createCategory, updateCategory, deleteCategory } =
    useCategoriesMutations();

  const { createMark, updateMark, deleteMark } = useMarksMutations();

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4 ">
      <Card className="bg-white w-full h-fit">
        <CardContent className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <CardHeader className="font-semibold p-0">Categorias</CardHeader>
            <Button
              variant={"secondary"}
              onClick={() => setCreateNewCategory(!createNewCategory)}
              className="flex items-center justify-start gap-2 group transition-all duration-300"
            >
              <span className="">Adicionar Nova</span>
              <PlusIcon className="transition-transform duration-300 group-hover:rotate-90" />
            </Button>
          </div>
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
                  <TableHead className="text-black">Ações</TableHead>
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
                        <div className="flex gap-2 pl-2">
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
              <TableRow hidden={!createNewCategory}>
                <TableCell>
                  <Input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </TableCell>
                <TableCell className="flex gap-2" colSpan={2}>
                  <Button
                    variant="button"
                    size="icon"
                    className=" border border-solid rounded-full border-green-500"
                    onClick={() => {
                      if (newCategoryName.trim()) {
                        createCategory.mutate({
                          name: newCategoryName,
                        });
                        setCreateNewCategory(false);
                        setNewCategoryName("");
                      }
                    }}
                  >
                    <Check className="w-4 h-4 text-green-500" />
                  </Button>
                  <Button
                    variant="button"
                    size="icon"
                    className=" border border-solid rounded-full border-red-500"
                    onClick={() => {
                      setCreateNewCategory(false);
                      setNewCategoryName("");
                    }}
                  >
                    <CircleX className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="bg-white w-full h-fit">
        <CardContent className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <CardHeader className="font-semibold p-0">Marcas</CardHeader>
            <Button
              variant="secondary"
              onClick={() => {
                setCreateNewMark(!createNewMark);
              }}
              className="flex items-center justify-start gap-2 group transition-all duration-300"
            >
              <span>Criar marca</span>
              <PlusIcon className="transition-transform duration-300 group-hover:rotate-90" />
            </Button>
          </div>
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
                  <TableHead className="text-black ">Ações</TableHead>
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
                        <div className="flex gap-2 pl-2">
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
              <TableRow hidden={!createNewMark}>
                <TableCell colSpan={1}>
                  <Input
                    type="text"
                    placeholder="Adicione uma nova marca"
                    value={newMarkName}
                    onChange={(e) => setNewMarkName(e.target.value)}
                  />
                </TableCell>
                <TableCell className="flex gap-2" colSpan={2}>
                  <Button
                    variant="button"
                    size="icon"
                    className=" border border-solid rounded-full border-green-500"
                    onClick={() => {
                      if (newMarkName.trim()) {
                        createMark.mutate({ name: newMarkName });
                        setCreateNewMark(false);
                        setNewMarkName("");
                      }
                    }}
                  >
                    <Check className="text-green-500" />
                  </Button>
                  <Button
                    variant="button"
                    size="icon"
                    className=" border border-solid rounded-full border-red-500"
                    onClick={() => {
                      setCreateNewMark(false);
                      setNewMarkName("");
                    }}
                  >
                    <CircleX className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsFilters;
