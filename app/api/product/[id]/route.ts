import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

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

  return NextResponse.json(data, { status: 200 });
}
