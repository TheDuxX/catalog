import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createSupabaseClient } from "../_utils/supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "Something went wrong"
) => {
  console.error(error);
  let errorMessage = defaultMessage;
  if (error instanceof Error && error.message.length < 100) {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const convertDecimalToNumber = (decimal: Decimal): number => {
  return parseFloat(decimal.toString()); // Converter Decimal para string e depois para número
};

export const FindManyProducts = async (): Promise<any[]> => {
  const supabase = createSupabaseClient();
  const { data: products, error } = await supabase
    .from("product")
    .select("*, category:categories(*), mark:marks(*)");

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Erro ao buscar produtos");
  }

  return products || []; // Certifique-se de que está retornando os produtos
};

export const FindManyCategories = async (): Promise<any[]> => {
  const supabase = createSupabaseClient();
  const { data: categories, error } = await supabase
    .from("category")
    .select("*");

  if (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Erro ao buscar categorias");
  }

  return categories || [];
};

export const FindManyMark = async () => {
  const supabase = createSupabaseClient();
  const { data: marks, error } = await supabase.from("marks").select("*");

  if (error) {
    console.error("Erro ao buscar marcas:", error);
    throw new Error("Erro ao buscar marcas");
  }

  return marks || [];
};

// Função para encontrar um produto específico com base no ID
export const FindUniqueProduct = async (id: string): Promise<any | null> => {
  const supabase = createSupabaseClient();
  let { data: product, error } = await supabase
    .from("product")
    .select(`*, category(*), mark(*)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar produto:", error);
  }

  return product || null;
};
