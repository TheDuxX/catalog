import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("category").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "O nome da categoria é obrigatório." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("category")
    .insert([{ name }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { id, name } = body;

  if (!id || !name) {
    return NextResponse.json(
      { error: "ID e nome são obrigatórios." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("category")
    .update({ name })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { error: "ID é obrigatório para deletar." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("category").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Categoria deletada com sucesso." },
    { status: 200 }
  );
}
