import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("increment_orders");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
