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
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Label } from "@/app/_components/ui/label";
import { useEffect, useState } from "react";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Button } from "@/app/_components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface Mark {
  id: string;
  name: string;
}

const fetchCategoriesAndMarks = async () => {
  try {
    const response = await fetch("/api/categories-marks");
    if (!response.ok) throw new Error("Erro ao buscar Categorias e Marcas");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { categories: [], marks: [] };
  }
};

const Filters = () => {
  const [itemOrientation, setItemOrientation] = useState(false); 
  const [itemCount, setItemCount] = useState(10); 
  const [sortOrder, setSortOrder] = useState("ascending"); 
  const [categories, setCategories] = useState<Category[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMark, setSelectedMark] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchCategoriesAndMarks().then((data) => {
      setCategories(data.categories);
      setMarks(data.marks);
    });
  }, []);

  const toggleOrientation = () => {
    setItemOrientation(!itemOrientation);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemCount(parseInt(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedMark(null);
    setFilterStatus("all");
  };

  return (
    <>
      <div className="flex flex-row gap-2 md:w-auto w-full justify-between">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="rounded-md px-1 md:w-auto w-full bg-primary text-white"
        >
          <option value="ascending">Preço: Crescente</option>
          <option value="descending">Preço: Decrescente</option>
          <option value="alphabetical">Ordem alfabética</option>
        </select>
        <select
          onChange={handleSelectChange}
          value={itemCount}
          className="px-2 rounded-md bg-primary md:w-auto w-full text-white"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <Sheet>
          <SheetTrigger
            asChild
            className="flex items-center px-2 rounded-md bg-primary text-white"
          >
            <div className="flex items-center md:w-auto w-full">
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
              <h2 className="font-semibold">Status do Produto</h2>
              <RadioGroup defaultValue="all" onValueChange={setFilterStatus}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="activated" id="r1" />
                  <Label
                    htmlFor="r1"
                    className="text-sm leading-none font-normal"
                  >
                    Ativos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disabled" id="r2" />
                  <Label
                    htmlFor="r2"
                    className="text-sm leading-none font-normal"
                  >
                    Desativados
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="r3" />
                  <Label
                    htmlFor="r3"
                    className="text-sm leading-none font-normal"
                  >
                    Todos
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mt-2 flex flex-col">
              <h2 className="font-semibold">Categorias</h2>
              {categories?.length > 0 ? (
                categories.map((category) => (
                  <div className="flex gap-2 py-2" key={category.id}>
                    <Checkbox
                      id={category.id}
                      checked={selectedCategory === category.id}
                      onCheckedChange={() =>
                        setSelectedCategory(
                          selectedCategory === category.id ? null : category.id
                        )
                      }
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
                      checked={selectedMark === mark.id}
                      onCheckedChange={() =>
                        setSelectedMark(
                          selectedMark === mark.id ? null : mark.id
                        )
                      }
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
            <SheetClose className="w-full flex justify-end">
              <Button className="mt-4" onClick={resetFilters}>
                Limpar Filtros
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
        <Button
          onClick={toggleOrientation}
          className="p-2 h-auto aspect-square bg-primary text-white border-none"
          variant="outline"
        >
          {itemOrientation ? <Columns /> : <Rows />}
        </Button>
      </div>
    </>
  );
};

export default Filters;
