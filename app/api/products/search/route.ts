import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Parâmetro 'query' obrigatório" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data: productData, error: productError } = await supabase
    .from("product")
    .select("*, category:categoryId(name), mark:markId(name)")
    .ilike("name", `%${query}%`);

  if (productError) throw productError;

  // Passo 2: Buscar categorias e marcas relacionadas à pesquisa
  const [
    { data: categories, error: categoryError },
    { data: marks, error: markError },
  ] = await Promise.all([
    supabase.from("category").select("id").ilike("name", `%${query}%`),
    supabase.from("mark").select("id").ilike("name", `%${query}%`),
  ]);

  if (categoryError || markError) throw categoryError || markError;

  // Passo 3: Obter produtos que pertencem às categorias ou marcas encontradas
  const categoryIds = categories?.map((c) => c.id) || [];
  const markIds = marks?.map((m) => m.id) || [];

  const [
    { data: categoryProducts, error: categoryProductError },
    { data: markProducts, error: markProductError },
  ] = await Promise.all([
    categoryIds.length
      ? supabase.from("product").select("*, category:categoryId(name), mark:markId(name)").in("categoryId", categoryIds)
      : { data: [], error: null },
    markIds.length
      ? supabase.from("product").select("*, category:categoryId(name), mark:markId(name)").in("markId", markIds)
      : { data: [], error: null },
  ]);

  if (categoryProductError || markProductError)
    throw categoryProductError || markProductError;

  // Passo 4: Combinar os resultados e remover duplicatas
  const allProducts = [...productData, ...categoryProducts, ...markProducts];

  // Remover duplicados usando Map (melhor performance que filter)
  const filteredProducts = Array.from(
    new Map(allProducts.map((p) => [p.id, p])).values()
  );

  return NextResponse.json(filteredProducts, { status: 200 });
}
