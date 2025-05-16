"use client";
import { FilterIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Label } from "@/app/_components/ui/label";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Button } from "@/app/_components/ui/button";
import { useProductFiltersViewModel } from "../_viewmodels/useProductFiltersViewModel";
import { Skeleton } from "@/app/_components/ui/skeleton";
const Filters = () => {
  const {
    categories,
    isLoadingCategories,
    marks,
    isLoadingMarks,
    sortOrder,
    selectedCategories,
    selectedMarks,
    setSortOrder,
    handleFilterApply,
    handleResetFilters,
    setSelectedCategories,
    setSelectedMarks,
  } = useProductFiltersViewModel();

  if (isLoadingCategories || isLoadingMarks)
    return (
      <div>
        <Skeleton className="md:w-2/3 w-full h-5 py-2" />
        <Skeleton className="md:w-2/3 w-full h-5 py-2" />
      </div>
    );

  return (
    <div className="w-auto ">
      <div className="flex flex-row gap-1 items-center h-full">
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="rounded-md px-1 md:w-auto min-h-[32px] md:h-full w-full bg-primary text-white"
        >
          <option value="date:desc">Recentes</option>
          <option value="date:asc">Antigos</option>
          <option value="views:desc">Mais Vistos</option>
          <option value="price:asc">Preço: Crescente</option>
          <option value="price:desc">Preço: Decrescente</option>
          <option value="name:asc">Ordem alfabética</option>
        </select>

        <Sheet>
          <SheetTrigger
            asChild
            className="flex items-center px-2 rounded-md bg-primary text-white cursor-pointer"
          >
            <div className="flex items-center min-h-[32px] md:h-full md:w-auto w-full">
              <FilterIcon size={18} className="fill-white stroke-none" />
              Filtros
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="text-left space-y-1 border-solid border-b-[1px] pb-2">
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Selecione os filtros que deseja.
              </SheetDescription>
            </SheetHeader>

            {/* Categorias */}
            <div className="mt-2 flex flex-col">
              <h2 className="font-semibold">Categorias</h2>
              {categories?.map((category) => (
                <div className="flex gap-2 py-2" key={category.id}>
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => {
                      const newCategories = selectedCategories.includes(
                        category.id
                      )
                        ? selectedCategories.filter((id) => id !== category.id)
                        : [...selectedCategories, category.id];

                      setSelectedCategories(newCategories);
                    }}
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-sm leading-none font-normal"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>

            {/* Marcas */}
            <div className="mt-2 flex flex-col">
              <h2 className="font-semibold">Marcas</h2>
              {marks?.map((mark) => (
                <div className="flex gap-2 py-2" key={mark.id}>
                  <Checkbox
                    id={mark.id}
                    checked={selectedMarks.includes(mark.id)}
                    onCheckedChange={() => {
                      const newMarks = selectedMarks.includes(mark.id)
                        ? selectedMarks.filter((id) => id !== mark.id)
                        : [...selectedMarks, mark.id];

                      setSelectedMarks(newMarks);
                    }}
                  />
                  <Label
                    htmlFor={mark.id}
                    className="text-sm leading-none font-normal"
                  >
                    {mark.name}
                  </Label>
                </div>
              ))}
            </div>

            <SheetClose asChild className="w-full flex justify-end">
              <div className="flex flex-row w-full gap-2">
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={handleResetFilters}
                >
                  Limpar Filtros
                </Button>
                <Button
                  className="mt-4"
                  variant="secondary"
                  onClick={handleFilterApply}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Filters;
