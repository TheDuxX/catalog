"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useCreateProduct } from "../../../_viewmodels/useCreateProduct";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea";
import { useState } from "react";
import { Skeleton } from "@/app/_components/ui/skeleton";

export default function CreateProductPage() {
  const {
    form,
    loading,
    onSubmit,
    marks,
    categories,
    isLoading,
    formatToCurrency,
  } = useCreateProduct();

  const [displayValue, setDisplayValue] = useState(
    form.getValues("price") ? formatToCurrency(form.getValues("price")) : ""
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const numericString = raw.replace(/\D/g, "");
    const valueAsNumber = Number(numericString) / 100;

    form.setValue("price", valueAsNumber);
    setDisplayValue(formatToCurrency(valueAsNumber));
  };

  if (isLoading) {
    return (
      <div className="w-2/3 flex flex-col gap-2">
        <Skeleton className="min-h-[140px] w-full bg-white shadow"></Skeleton>
        <Skeleton className="min-h-80 w-full bg-white shadow"></Skeleton>
        <Skeleton className="h-10 bg-white shadow w-1/3"></Skeleton>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-start md:p-4">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
          className="flex flex-col gap-4 md:w-2/3"
        >
          <FormField
            control={form.control}
            name="imageUrls"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Imagens do produto
                </FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    <Label
                      htmlFor="upload"
                      className="w-24 h-24 flex items-center justify-center border border-dashed rounded bg-white cursor-pointer"
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
                        field.onChange([...(field.value || []), ...newUrls]);
                      }}
                    />
                    {field.value?.map((url: string, index: number) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded border overflow-hidden"
                      >
                        <Image
                          src={url}
                          alt={`preview-${index}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Selecione uma ou mais imagens. Elas serão apenas visualizadas,
                  não enviadas ainda.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nome do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                return (
                  <FormItem className="w-1/2">
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="R$ 0,00"
                        value={displayValue}
                        onChange={handlePriceChange}
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
                  <FormLabel className="font-semibold"> Referência</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a referência do produto"
                      {...field}
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
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
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
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {marks?.map((mark) => (
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
          <Button
            variant={"secondary"}
            className="font-semibold md:w-1/4"
            disabled={loading}
            type="submit"
          >
            {loading ? "Criando..." : "Cadastrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
