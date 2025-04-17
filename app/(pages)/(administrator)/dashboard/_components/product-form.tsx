"use client";

import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import Image from "next/image";
import { Label } from "@/app/_components/ui/label";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useProductForm } from "../_viewmodels/useProductForm";
import { Button } from "@/app/_components/ui/button";
import { Skeleton } from "@/app/_components/ui/skeleton";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableImage from "./sortableImage";

const ProductForm = () => {
  const { id } = useParams();
  const {
    product,
    form,
    onSubmit,
    isLoading,
    categories,
    marks,
    formatToCurrency,
    edit,
    setEdit,
    handleChangeStatus,
    handleRemoveImage,
    resetForm,
  } = useProductForm({ id: String(id) });
  const sensors = useSensors(useSensor(PointerSensor));

  if (isLoading || !product) {
    return (
      <div className="p-4">
        <div className="w-full h-full flex flex-col gap-6">
          <div className="grid md:grid-cols-5 grid-cols-2 gap-2 w-1/2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="md:min-w-[100px] w-full shadow flex items-center justify-center aspect-square"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-20" />
            <div className="flex flex-row gap-2">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
            <div className="flex flex-row gap-2">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
            <div className="w-1/3 flex flex-row gap-2">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen rounded-md flex flex-row gap-2">
      <Form {...form}>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="md:w-1/2">
              <FormField
                control={form.control}
                name="imageUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Imagens do produto
                    </FormLabel>
                    <FormControl>
                      <div>
                        {edit ? (
                          <div className="gap-2 grid md:grid-cols-5 grid-cols-2">
                            {form.watch("imageUrls")?.map((url, index) => (
                              <div
                                className="relative w-full h-auto aspect-square rounded-md overflow-hidden shadow"
                                key={url}
                              >
                                <Image
                                  src={url}
                                  alt={`${product.name}-${index}`}
                                  fill
                                  className="object-contain object-center"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  priority
                                />
                                <button
                                  type="button"
                                  hidden={edit}
                                  onClick={() => handleRemoveImage(url)}
                                  className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
                                >
                                  <Trash2 className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={({ active, over }) => {
                              if (!over) return; // over pode ser null
                              const currentUrls = form.watch("imageUrls") ?? [];

                              const oldIndex = currentUrls.indexOf(
                                active.id as string
                              );
                              const newIndex = currentUrls.indexOf(
                                over.id as string
                              );

                              if (
                                oldIndex !== -1 &&
                                newIndex !== -1 &&
                                oldIndex !== newIndex
                              ) {
                                const newOrder = arrayMove(
                                  currentUrls,
                                  oldIndex,
                                  newIndex
                                );
                                form.setValue("imageUrls", newOrder);
                              }
                            }}
                          >
                            <SortableContext
                              items={
                                (form.watch("imageUrls") ?? []) as string[]
                              }
                              strategy={rectSortingStrategy}
                            >
                              <div className="gap-2 grid md:grid-cols-5 grid-cols-2">
                                {form.watch("imageUrls")?.map((url, index) => (
                                  <SortableImage
                                    key={url}
                                    url={url}
                                    index={index}
                                    onRemove={() => handleRemoveImage(url)}
                                    disabled={edit}
                                    name={product.name}
                                  />
                                ))}
                              </div>
                            </SortableContext>
                          </DndContext>
                        )}

                        {!edit && (
                          <>
                            <Label
                              htmlFor="upload"
                              className="w-full aspect-square h-auto flex items-center justify-center border border-dashed rounded bg-white cursor-pointer"
                            >
                              <Plus className="text-gray-500" />
                            </Label>
                            <Input
                              id="upload"
                              type="file"
                              multiple
                              className="hidden"
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                const newUrls = files.map((file) =>
                                  URL.createObjectURL(file)
                                );
                                form.setValue("imageUrls", [
                                  ...(form.getValues("imageUrls") || []),
                                  ...newUrls,
                                ]);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="md:w-1/2 flex flex-col gap-4">
              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Nome do produto
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={product.name}
                          {...field}
                          disabled={edit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={product.description}
                        {...field}
                        disabled={edit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => {
                    const [displayValue, setDisplayValue] = useState(
                      product.price ? formatToCurrency(product.price) : ""
                    );
                    const handleChange = (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const raw = e.target.value;
                      const numericString = raw.replace(/\D/g, "");
                      const valueAsNumber = Number(numericString) / 100;
                      field.onChange(valueAsNumber);
                      setDisplayValue(formatToCurrency(valueAsNumber));
                    };
                    return (
                      <FormItem className="w-1/2">
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder={displayValue}
                            disabled={edit}
                            onChange={handleChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-semibold">
                        Referência
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={product.reference}
                          {...field}
                          disabled={edit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 w-full">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-semibold">Categoria</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={edit}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="markId"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="font-semibold">Marca</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={edit}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {marks.map((mark) => (
                              <SelectItem key={mark.id} value={mark.id}>
                                {mark.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              variant="secondary"
              className={`py-2 px-6 mt-4 ${edit ? "" : "hidden"}`}
              onClick={() => setEdit(false)}
            >
              Editar
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className={`py-2 px-6 mt-4 ${edit ? "hidden" : ""}`}
            >
              Salvar
            </Button>
            <Button
              type="reset"
              variant="outline"
              className={`py-2 px-6 mt-4 ${edit ? "hidden" : ""}`}
              onClick={() => {
                setEdit(true);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`py-2 px-6 mt-4 `}
              onClick={handleChangeStatus}
            >
              {product.status ? "Desativar" : "Ativar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
