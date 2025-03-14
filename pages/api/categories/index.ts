import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const [categoriesRes, marksRes] = await Promise.all([
    supabase.from("category").select("id, name"),
    supabase.from("mark").select("id, name"),
  ]);

  if (categoriesRes.error || marksRes.error) {
    return NextResponse.json(
      { error: "Erro ao buscar categorias e marcas" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { categories: categoriesRes.data, marks: marksRes.data },
    { status: 200 }
  );
}
