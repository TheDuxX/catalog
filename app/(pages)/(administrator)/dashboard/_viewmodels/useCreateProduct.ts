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
import { fetchCategory, fetchMark } from "../_services/category-mark-service";
import { useQuery } from "@tanstack/react-query";
import {
  categoryService,
  markService,
} from "../(pages)/settings/_services/filters-service";

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorData,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const {
    data: marks,
    isLoading: marksLoading,
    isError: marksError,
    error: marksErrorData,
    refetch: refetchMarks,
  } = useQuery({
    queryKey: ["marks"],
    queryFn: () => markService.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

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
    setLoading(true);

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
      setLoading(false);
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

  return {
    form,
    onSubmit,
    marks,
    categories,
    loading,
    isLoading: categoriesLoading || marksLoading,
    formatToCurrency,
  };
}
