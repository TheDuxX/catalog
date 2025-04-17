import { z } from "zod";
import { productSchema } from "../_schemas/product-schema";

const BASE_URL = "/api/product";

export type ProductSchemaType = z.infer<typeof productSchema>;

export async function getProductById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Erro ao buscar produto");
  }

  return res.json();
}

export async function updateProduct(id: string, data: ProductSchemaType) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Erro ao atualizar produto");
  }

  return { success : true};
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Erro ao excluir produto");
  }

  return res.json();
}
