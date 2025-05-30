"use client";

import { useForm } from "react-hook-form";
import { productSchema } from "../_schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import {
  useProductQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteImagesMutation,
  useUploadImagesMutation,
  useDeleteProductMutation,
} from "../_queries/product-queries";
import { useQuery } from "@tanstack/react-query";
import {
  categoryService,
  markService,
} from "../(pages)/settings/_services/filters-service";

type ProductFormProps = {
  id: string;
};

export function useProductForm({ id }: ProductFormProps) {
  const isEditMode = !!id;
  const router = useRouter();
  const [edit, setEdit] = useState(true);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

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

  const { reset } = form;

  const { data: product, isPending: productLoading } = useProductQuery(id);
  const updateMutation = useUpdateProductMutation();
  const createMutation = useCreateProductMutation();
  const deleteMutation = useDeleteProductMutation();
  const deleteImagesMutation = useDeleteImagesMutation();
  const uploadImagesMutation = useUploadImagesMutation();

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const { data: marks, isLoading: marksLoading } = useQuery({
    queryKey: ["marks"],
    queryFn: () => markService.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        reference: product.reference,
        imageUrls: product.imageUrls,
        categoryId: product.category.id,
        markId: product.mark.id,
        price: product.price,
      });
    }
  }, [product, reset]);

  const handleRemoveImage = (url: string) => {
    const currentImages = form.getValues("imageUrls");
    const updatedImages = currentImages!.filter((img) => img !== url);
    form.setValue("imageUrls", updatedImages);
    setRemovedImages((prev) => [...prev, url]);
  };

  const resetForm = () => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        reference: product.reference,
        imageUrls: product.imageUrls,
        categoryId: product.category.id,
        markId: product.mark.id,
        price: product.price,
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      const fileInputs = (document.getElementById("upload") as HTMLInputElement)
        ?.files;
      const files = fileInputs ? Array.from(fileInputs) : [];

      const uploadedUrls =
        files.length > 0 ? await uploadImagesMutation.mutateAsync(files) : [];

      const finalImageUrls = (() => {
        const existing = product?.imageUrls || [];
        const remaining = existing.filter(
          (url: string) => !removedImages.includes(url)
        );
        return [...remaining, ...uploadedUrls];
      })();

      if (isEditMode) {
        if (removedImages.length > 0) {
          await deleteImagesMutation.mutateAsync(removedImages);
        }

        const payload = { ...data, imageUrls: finalImageUrls };
        const response = await updateMutation.mutateAsync({ id, payload });

        if (response?.success) {
          toast.success("Produto atualizado com sucesso!");
          setEdit(false);
          resetForm();
          router.push(`/dashboard/product/${id}`);
        }
      } else {
        const payload = { ...data, imageUrls: uploadedUrls };
        await createMutation.mutateAsync(payload);
        toast.success("Produto criado com sucesso!");
        router.back();
        form.reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar produto.");
    }
  };

  const handleChangeStatus = async () => {
    if (!product) return;
    const updatedStatus = !product.status;

    try {
      await updateMutation.mutateAsync({
        id: product.id,
        payload: { ...product, status: updatedStatus },
      });

      toast.success("Status alterado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao alterar status.");
    }
  };

  function formatToCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Erro ao deletar produto", err);
    }
  };

  return {
    product,
    form,
    onSubmit,
    isLoading:
      updateMutation.isPending ||
      createMutation.isPending ||
      deleteImagesMutation.isPending ||
      uploadImagesMutation.isPending ||
      categoriesLoading ||
      marksLoading,
    productLoading,
    isEditMode,
    edit,
    categories,
    marks,
    formatToCurrency,
    setEdit,
    handleChangeStatus,
    reset,
    handleRemoveImage,
    resetForm,
    handleDeleteProduct,
  };
}
