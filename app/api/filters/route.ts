import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category")?.split(",") || [];
  const mark = searchParams.get("mark")?.split(",") || [];
  const status = true;

  let query = supabase.from("product")
    .select(`id, name, description, reference, status, price, date, "imageUrls", views, categoryId,
    category:categoryId(name), markId,
    mark:markId(name)`);

  // Aplicando os filtros corretamente
  if (category.length > 0) {
    query = query.in("categoryId", category);
  }
  if (mark.length > 0) {
    query = query.in("markId", mark);
  }
  if (status) {
    query = query.eq("status", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro na consulta:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
