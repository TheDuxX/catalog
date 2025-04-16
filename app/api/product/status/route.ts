import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const { id, status } = body;

  if (!id) {
    return NextResponse.json(
      { error: "ID do produto é obrigatório." },
      { status: 400 }
    );
  }

  if (typeof status !== "boolean") {
    return NextResponse.json({ error: "Status inválido." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("product")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
