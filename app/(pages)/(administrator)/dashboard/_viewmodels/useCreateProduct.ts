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
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) throw new Error("Erro ao buscar Categorias");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMarks = async () => {
      try {
        const response = await fetch("/api/mark");
        if (!response.ok) throw new Error("Erro ao buscar Marcas");
        const data = await response.json();
        setMarks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchMarks();
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

  return { form, onSubmit, marks, categories, isLoading };
}
