"use client";
import { Columns, FilterIcon, Rows } from "lucide-react";
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
import { useFilters } from "@/app/_utils/filters-context";

const Filters = () => {
  const params = new URLSearchParams();

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
    setSelectedCategories([]);
    setSelectedMarks([]);
    setFilterStatus("all");
    setSortOrder("price:asc");
    params.delete("category");
    params.delete("mark");
    params.delete("status");
    params.delete("sort");

    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <>
      <div className="w-auto md:mr-2">
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
          <select
            onChange={(e) => setItemCount(Number(e.target.value))}
            value={itemCount}
            className="px-2 rounded-md bg-primary min-h-[32px] md:h-full md:w-auto w-full text-white"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <Sheet>
            <SheetTrigger
              asChild
              className="flex items-center px-2  rounded-md bg-primary text-white"
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
              <div className="mt-2 flex flex-col">
                <h2 className="font-semibold">Categorias</h2>
                {categories?.length > 0 ? (
                  categories.map((category) => (
                    <div className="flex gap-2 py-2" key={category.id}>
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => {
                          const newCategories = selectedCategories.includes(
                            category.id
                          )
                            ? selectedCategories.filter(
                                (id) => id !== category.id
                              )
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
                  ))
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
              <div className="mt-2 flex flex-col">
                <h2 className="font-semibold">Marcas</h2>
                {marks?.length > 0 ? (
                  marks.map((mark) => (
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
                  ))
                ) : (
                  <p>Carregando...</p>
                )}
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
          <Button
            onClick={toggleOrientation}
            className="p-2 h-full aspect-square bg-primary text-white border-none"
            variant="outline"
          >
            {itemOrientation ? <Columns /> : <Rows />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Filters;
