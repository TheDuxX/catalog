"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { productSchema } from "../_schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { fetchCategoryMark } from "../_services/category-mark-service";
import { getProductById, updateProduct } from "../_services/product-service";
import { createProduct } from "../_services/createProduct-service";
import { uploadImages } from "../_services/uploadImages";

type Categories = { id: string; name: string };
type Marks = { id: string; name: string };

interface ProductProps {
  id: string;
  name: string;
  description: string;
  reference: string;
  status: boolean;
  date: Date;
  price: number;
  imageUrls: string[];
  views: number | null;
  category: {
    id: string;
    name: string;
  };
  mark: {
    id: string;
    name: string;
  };
}

export function useProductForm({ id }: { id: string }) {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [marks, setMarks] = useState<Marks[]>([]);
  const [edit, setEdit] = useState(true);

  const isEditMode = !!id;

  const router = useRouter();

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

  const { setValue, reset } = form;

  useEffect(() => {
    const loadCategoriesAndMarks = async () => {
      const { category, mark } = await fetchCategoryMark();
      setCategories(category);
      setMarks(mark);
    };

    loadCategoriesAndMarks();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setProductLoading(true);
        const product = await getProductById(id);
        setProduct(product);

        reset({
          name: product.name,
          description: product.description,
          reference: product.reference,
          imageUrls: product.imageUrls,
          categoryId: product.category.id,
          markId: product.mark.id,
          price: product.price,
        });
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        toast.error("Erro ao carregar produto.");
      } finally {
        setProductLoading(false);
      }
    };

    loadProduct();
  }, [id, reset]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    setIsLoading(true);
    try {
      const fileInputs = (document.getElementById("upload") as HTMLInputElement)
        ?.files;
      const files = fileInputs ? Array.from(fileInputs) : [];

      const uploadedUrls = files.length > 0 ? await uploadImages(files) : [];

      const payload = {
        ...data,
        imageUrls: uploadedUrls.length > 0 ? uploadedUrls : data.imageUrls,
      };

      if (isEditMode) {
        toast("Função de edição ainda não implementada.");
        console.log("Editar produto com payload:", payload);
      } else {
        await createProduct(payload);
        toast.success("Produto criado com sucesso!");
        router.push("/dashboard/products");
        form.reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar produto.");
    } finally {
      setIsLoading(false);
    }
  };

  function formatToCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleChangeStatus = async () => {
    if (!product) return;

    try {
      const updatedStatus = !product.status;
      await updateProduct(product.id, { status: updatedStatus } as any);

      // Atualiza localmente
      setProduct({ ...product, status: updatedStatus });

      toast.success("Status alterado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao alterar status.");
    }
  };

  return {
    product,
    form,
    onSubmit,
    isLoading,
    productLoading,
    isEditMode,
    categories,
    marks,
    formatToCurrency,
    edit,
    setEdit,
    handleChangeStatus,
    reset,
  };
}
