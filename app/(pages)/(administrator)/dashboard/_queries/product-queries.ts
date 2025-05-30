// src/app/(pages)/(administrator)/dashboard/_queries/product-queries.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../_services/product-service";
import { createProduct } from "../_services/createProduct-service";
import { deleteImages, uploadImages } from "../_services/uploadImages";
import toast from "react-hot-toast";

interface ProductProps {
  name: string;
  price: number;
  categoryId: string;
  markId: string;
  status?: boolean;
  description?: string | undefined;
  reference?: string | undefined;
  imageUrls?: string[] | undefined;
}

export const useProductQuery = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

export const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProductProps }) =>
      updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao atualizar produto.");
    },
  });

export const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Produto deletado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar produto.");
    },
  });

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: (payload: ProductProps) => createProduct(payload),
    onSuccess: () => {
      toast.success("Produto criado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao criar produto.");
    },
  });

export const useDeleteImagesMutation = () =>
  useMutation({
    mutationFn: (urls: string[]) => deleteImages(urls),
    onSuccess: () => {
      toast.success("Imagens deletadas com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar imagens.");
    },
  });

export const useUploadImagesMutation = () =>
  useMutation({
    mutationFn: (files: File[]) => uploadImages(files),
    onSuccess: () => {
      toast.success("Imagens carregadas com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao carregar imagens.");
    },
  });
