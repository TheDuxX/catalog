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
import { deleteImages, uploadImages } from "../_services/uploadImages";

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
  const [removedImages, setRemovedImages] = useState<string[]>([]);

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
        console.log("Form values:", form.getValues());
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        toast.error("Erro ao carregar produto.");
      } finally {
        setProductLoading(false);
      }
    };

    loadProduct();
  }, [id, reset]);

  const handleRemoveImage = (url: string) => {
    const currentImages = form.getValues("imageUrls") || [];
    const updatedImages = currentImages.filter((img: string) => img !== url);
    form.setValue("imageUrls", updatedImages);
    setRemovedImages((prev) => [...prev, url]);
  };

  const resetForm = async () => {
    const updatedProduct = await getProductById(id);
    setProduct(updatedProduct);
    form.reset({
      name: updatedProduct.name,
      description: updatedProduct.description,
      reference: updatedProduct.reference,
      imageUrls: updatedProduct.imageUrls,
      categoryId: updatedProduct.category.id,
      markId: updatedProduct.mark.id,
      price: updatedProduct.price,
    });
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    function buildImageUrls(
      existing: string[] = [],
      removed: string[] = [],
      uploaded: string[] = []
    ): string[] {
      const remaining = existing.filter((url) => !removed.includes(url));
      return [...remaining, ...uploaded];
    }
    setIsLoading(true);
    try {
      const fileInputs = (document.getElementById("upload") as HTMLInputElement)
        ?.files;
      const files = fileInputs ? Array.from(fileInputs) : [];

      const uploadedUrls = files.length > 0 ? await uploadImages(files) : [];

      if (isEditMode) {
        if (removedImages.length > 0) {
          await deleteImages(removedImages);
        }

        const finalImageUrls = buildImageUrls(
          product?.imageUrls,
          removedImages,
          uploadedUrls
        );

        const editPayload = {
          ...data,
          imageUrls: finalImageUrls,
        };

        try {
          const response = await updateProduct(id, editPayload);

          if (response?.success) {
            toast.success("Produto atualizado com sucesso!");

            resetForm();

            setEdit(!edit);
            router.push(`/dashboard/product/${id}`);
          }
        } catch (error) {
          console.error("Erro ao atualizar produto", error);
          toast.error("Erro ao atualizar produto.");
        }
      } else {
        const finalImageUrls = uploadedUrls;

        const createPayload = {
          ...data,
          imageUrls: finalImageUrls,
        };

        await createProduct(createPayload);
        toast.success("Produto criado com sucesso!");
        router.back();
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
    handleRemoveImage,
    resetForm,
  };
}
