import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("mark").select("*");
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

  const { data: createdMark, error } = await supabase
    .from("mark")
    .insert([{ name }])
    .select()
    .single();

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
      action: "update",
      entity: "mark",
      entity_id: createdMark.id, // ID da categoria criada
      user_id: user.id, // ID do usuário autenticado!
      details: `Criou a marca ${createdMark.name}`,
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

  return NextResponse.json(createdMark, { status: 201 });
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { id, name } = body;

  const { data: mark, error } = await supabase
    .from("mark")
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

  const { data: updateMark, error: markError } = await supabase
    .from("mark")
    .update({ name })
    .eq("id", id)
    .select()
    .single();

  if (markError) {
    return NextResponse.json({ error: markError.message }, { status: 500 });
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
      entity: "mark",
      entity_id: updateMark.id, // ID da categoria criada
      user_id: user.id, // ID do usuário autenticado!
      details: `Atualizou a marca ${mark.name} para ${updateMark.name}`,
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

  return NextResponse.json(updateMark, { status: 200 });
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

  const { data: deletedMark, error } = await supabase
    .from("mark")
    .delete()
    .eq("id", id)
    .select()
    .single();

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
      entity: "mark",
      entity_id: deletedMark.id,
      user_id: user.id,
      details: `Deletou a marca ${deletedMark.name}`,
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

  return NextResponse.json(deletedMark, { status: 200 });
}
