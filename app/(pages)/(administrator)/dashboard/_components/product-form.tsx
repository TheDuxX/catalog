"use client";

import { useParams } from "next/navigation";
import { useEditProduct } from "../_viewmodels/useEditProduct";
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
import { Plus } from "lucide-react";
import { useProductForm } from "../_viewmodels/useProductForm";
import { Button } from "@/app/_components/ui/button";

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
  } = useProductForm({ id: String(id) });

  if (isLoading) return <div>Carregando...</div>;
  if (!product) return <div>Produto não encontrado</div>;

  console.log(product);

  return (
    <div className="w-full h-screen rounded-md flex flex-row gap-2">
      <Form {...form}>
        <form className="w-full">
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <div className="md:w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
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
                      // Remove tudo que não for número
                      const numericString = raw.replace(/\D/g, "");
                      // Converte para número com centavos
                      const valueAsNumber = Number(numericString) / 100;
                      // Atualiza o valor real do form
                      field.onChange(valueAsNumber);
                      // Atualiza o que está sendo exibido
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
                        {" "}
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
                          defaultValue={field.value}
                          disabled={edit}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={product.category.name} />
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
                          disabled={edit}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={product.mark.name} />
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
              <div className="">
                {product.status ? (
                  <p>Produto Ativo</p>
                ) : (
                  <p>Produto Desativado</p>
                )}
              </div>
            </div>
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
                      <div className="gap-2 grid md:grid-cols-4 grid-cols-2">
                        {product.imageUrls.map((url, index) => (
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
                          </div>
                        ))}
                        <Label
                          htmlFor="upload"
                          className="w-full h-auto flex items-center justify-center border border-dashed rounded bg-white cursor-pointer"
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
          </div>
          <Button
            type="button"
            variant="secondary"
            className={`py-2 px-6 mt-4 ${edit ? "" : "hidden"}`}
            onClick={() => setEdit(false)}
          >
            Editar
          </Button>
          <div className="flex flex-row gap-2">
            <Button
              type="submit"
              variant="secondary"
              className={`py-2 px-6 mt-4 ${edit ? "hidden" : ""}`}
            >
              Salvar
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`py-2 px-6 mt-4 ${edit ? "hidden" : ""}`}
              onClick={() => setEdit(true)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
