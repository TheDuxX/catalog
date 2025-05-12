import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const updates = body.map((banner) => ({
    id: banner.id,
    ...(banner.is_visible !== undefined && { is_visible: banner.is_visible }),
    ...(banner.order !== undefined && { order: banner.order }),
  }));

  const { error } = await supabase.from("banners").upsert(updates, {
    onConflict: "id",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Banners atualizados com sucesso" },
    { status: 200 }
  );
}
