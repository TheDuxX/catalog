// src/app/(pages)/(administrator)/dashboard/_queries/product-queries.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProductById, updateProduct } from "../_services/product-service";
import { createProduct } from "../_services/createProduct-service";
import { deleteImages, uploadImages } from "../_services/uploadImages";

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
  });

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: (payload: ProductProps) => createProduct(payload),
  });

export const useDeleteImagesMutation = () =>
  useMutation({
    mutationFn: (urls: string[]) => deleteImages(urls),
  });

export const useUploadImagesMutation = () =>
  useMutation({
    mutationFn: (files: File[]) => uploadImages(files),
  });
