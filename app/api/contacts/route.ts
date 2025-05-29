import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("contacts").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { name, email, phone, message } = await req.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Preencha todos os campos" },
      { status: 400 }
    );
  }

  const { data: createdContact, error } = await supabase
    .from("contacts")
    .insert([{ name, email, phone, message }])
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
      entity: "category",
      entity_id: createdContact.id,
      user_id: user.id,
      details: `Criou o contato ${createdContact.name}`,
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

  return NextResponse.json(createdContact, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();

  const body = await req.json();
  const { id } = body;

  const { data: deletedContact, error } = await supabase
    .from("contacts")
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
      entity: "category",
      entity_id: deletedContact.id,
      user_id: user.id,
      details: `Deletou o contato ${deletedContact.name}`,
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
    { message: "Contato removido com sucesso" },
    { status: 200 }
  );
}
