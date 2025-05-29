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

  const { data: createdCategory, error: categoryError } = await supabase
    .from("category")
    .insert([{ name }])
    .select()
    .single();

  if (categoryError) {
    return NextResponse.json({ error: categoryError.message }, { status: 500 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const { error: logError } = await supabase.from("action_logs").insert({
      action: "create",
      entity: "category",
      entity_id: createdCategory.id, // ID da categoria criada
      user_id: user.id, // ID do usuário autenticado!
      details: `Criou a categoria ${createdCategory.name}`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de criação de categoria:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(createdCategory, { status: 201 });
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { id, name } = body;

  const { data: category, error } = await supabase
    .from("category")
    .select("*")
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!id || !name) {
    return NextResponse.json(
      { error: "ID e nome são obrigatórios." },
      { status: 400 }
    );
  }

  const { data: updatedCategory, error: categoryError } = await supabase
    .from("category")
    .update({ name })
    .eq("id", id)
    .select()
    .single();

  if (categoryError) {
    return NextResponse.json({ error: categoryError.message }, { status: 500 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const { error: logError } = await supabase.from("action_logs").insert({
      action: "update",
      entity: "category",
      entity_id: updatedCategory.id, // ID da categoria criada
      user_id: user.id, // ID do usuário autenticado!
      details: `Atualizou a categoria ${category.name} para ${updatedCategory.name}`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de criação de categoria:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(updatedCategory, { status: 200 });
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

  const { data: category, error: categoryError } = await supabase
    .from("category")
    .select("*")
    .eq("id", id)
    .select()
    .single();

  if (categoryError) {
    return NextResponse.json({ error: categoryError.message }, { status: 500 });
  }

  const { error } = await supabase.from("category").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const { error: logError } = await supabase.from("action_logs").insert({
      action: "create",
      entity: "category",
      entity_id: category.id, // ID da categoria criada
      user_id: user.id, // ID do usuário autenticado!
      details: `Deletou a categoria ${category.name}`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de criação de categoria:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(
    { message: "Categoria deletada com sucesso." },
    { status: 200 }
  );
}
