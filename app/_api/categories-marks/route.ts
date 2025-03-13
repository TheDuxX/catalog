import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const [{ data: categories, error: categoriesError }, { data: marks, error: marksError }] = 
    await Promise.all([
      supabase.from("category").select("id, name"),
      supabase.from("mark").select("id, name"),
    ]);

  if (categoriesError || marksError) {
    return NextResponse.json({ error: "Erro ao buscar Categorias ou Marcas" }, { status: 500 });
  }

  return NextResponse.json({ categories, marks }, { status: 200 });
}
