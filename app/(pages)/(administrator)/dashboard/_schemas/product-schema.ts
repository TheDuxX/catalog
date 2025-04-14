import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  reference: z.string().optional(),
  price: z.number().min(0, "Preço deve ser positivo"),
  imageUrls: z.array(z.string().url()).optional(),
  categoryId: z.string(),
  markId: z.string(),
});

export type ProductInput = z.infer<typeof productSchema>;
