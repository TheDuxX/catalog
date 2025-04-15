"use client";

import { useForm } from "react-hook-form";
import { productSchema } from "../_schemas/product-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { uploadImages } from "../_services/uploadImages";
import { createProduct } from "../_services/createProduct-service";
import { useRouter } from "next/navigation";
import { fetchCategoryMark } from "../_services/category-mark-service";

type Categories = {
  id: string;
  name: string;
};

type Marks = {
  id: string;
  name: string;
};

export function useCreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [marks, setMarks] = useState<Marks[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchCategoryMark().then(({ category, mark }) => {
      setCategories(category);
      setMarks(mark);
    });
  }, []);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      reference: "",
      imageUrls: [],
      categoryId: "",
      markId: "",
      price: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof productSchema>) {
    setIsLoading(true);

    try {
      const fileInputs = (document.getElementById("upload") as HTMLInputElement)
        ?.files;

      const files = fileInputs ? Array.from(fileInputs) : [];

      const uploadedUrls = files.length > 0 ? await uploadImages(files) : [];

      const payload = {
        ...data,
        imageUrls: uploadedUrls,
      };

      await createProduct(payload);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar produto");
    } finally {
      toast.success("Produto criado com sucesso");
      setIsLoading(false);
      router.push("/dashboard/products");
      form.reset();
    }
  }

  function formatToCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return { form, onSubmit, marks, categories, isLoading, formatToCurrency };
}
