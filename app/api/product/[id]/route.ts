import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

// GET: Buscar produto por ID
export async function GET(req: NextRequest, { params }: Params) {
  const id = params.id;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product")
    .select(
      `id, name, description, reference, status, price, date, "imageUrls", views, categoryId,
       category:categoryId(name), markId,
       mark:markId(name)`
    )
    .eq("id", id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data, { status: 200 });
}

// PUT: Atualizar produto
export async function PUT(req: NextRequest, { params }: Params) {
  const id = params.id;
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("product")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data, { status: 200 });
}

// DELETE: Remover produto
export async function DELETE(req: NextRequest, { params }: Params) {
  const id = params.id;
  const supabase = await createClient();

  const { error } = await supabase.from("product").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(
    { message: "Produto removido com sucesso" },
    { status: 200 }
  );
}
