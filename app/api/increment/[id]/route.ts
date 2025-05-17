import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

interface Params {
  id: string; // Defina o tipo do seu parâmetro dinâmico 'id'
}

export async function PUT({ params }: { params: Params }) {
  const id = params.id;

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("increment_column", {
    row_id: id,
    increment_by: 1,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
