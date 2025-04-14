import { z } from "zod";
import { productSchema } from "../_schemas/product-schema";

export async function createProduct(input: z.infer<typeof productSchema>) {
  const response = await fetch("/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Erro ao criar produto");
  }

  return await response.json();
}