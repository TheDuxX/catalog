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
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Switch } from "@/app/_components/ui/switch";
import { Skeleton } from "@/app/_components/ui/skeleton";

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
  } = useProductForm({ id: String(id) });

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
                      <div className="gap-2 grid md:grid-cols-5 grid-cols-2">
                        {form.watch("imageUrls")?.map((url, index) => (
                          <div
                            className="relative w-full h-auto aspect-square rounded-md overflow-hidden shadow"
                            key={index}
                          >
                            <Image
                              src={url}
                              alt={`${product.name}-${index}`}
                              fill
                              className="object-contain object-center"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                            />
                            {!edit && (
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(url)}
                                className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
                              >
                                <Trash2 className="w-4 h-4 text-white" />
                              </button>
                            )}
                          </div>
                        ))}
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
                            field.onChange([
                              ...(field.value || []),
                              ...newUrls,
                            ]);
                          }}
                        />
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
                          placeholder="Nome do produto"
                          {...field}
                          value={product.name}
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
                        placeholder="Digite a descrição do produto"
                        {...field}
                        disabled={edit}
                        value={product.description}
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
                            placeholder="R$ 0,00"
                            value={displayValue}
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
                          placeholder="Digite a referência do produto"
                          {...field}
                          value={product.reference}
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
                            <SelectValue placeholder="Selecione uma categoria" />
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
                            <SelectValue placeholder={product.mark?.name} />
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
              onClick={() => setEdit(true)}
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
