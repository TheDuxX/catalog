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

export default function CreateProductPage() {
  const { form, onSubmit, marks, categories, isLoading } = useCreateProduct();

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
                <FormLabel className="font-semibold">Imagens do produto</FormLabel>
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
                  <Input
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
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="font-semibold">Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o preço do produto"
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma marca" />
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
          <Button variant={"secondary"} className="font-semibold md:w-1/4" disabled={isLoading} type="submit">
            {isLoading ? "Criando..." : "Cadastrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
