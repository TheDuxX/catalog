import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return new Response(JSON.stringify({ error: "ID não fornecido" }), {
      status: 400,
    });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product")
    .select(
      `id, name, description, reference, status, price, date, "imageUrls", views, categoryId,
       category:categoryId(id, name), markId,
       mark:markId(id, name)`
    )
    .eq("id", id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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
      entity: "product",
      entity_id: data.id,
      user_id: user.id,
      details: `Atualizou o produto ${data.name}`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de atualização de produto:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(data, { status: 200 });
}

// DELETE: Remover produto
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = await createClient();

  const { data: deletedProduct, error } = await supabase
    .from("product")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

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
      action: "delete",
      entity: "product",
      entity_id: deletedProduct.id, // ID da categoria criada
      user_id: user.id, // ID do usuário autenticado!
      details: `Deletou o produto ${deletedProduct.name}`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de exclusão de produto:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(deletedProduct, { status: 200 });
}
