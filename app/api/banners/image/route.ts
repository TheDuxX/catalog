import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Parâmetro id é obrigatório." },
      { status: 400 }
    );
  }

  const { data } = supabase.storage.from("banners").getPublicUrl(id);

  if (!data.publicUrl) {
    return NextResponse.json(
      { error: "Imagem não encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json({ publicUrl: data.publicUrl }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const formData = await req.formData();
  const fileData = formData.get("image") as File;

  if (!fileData) {
    return NextResponse.json(
      { error: "Imagem é obrigatório!" },
      { status: 400 }
    );
  }

  const fileExt = fileData.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("banners")
    .upload(filePath, fileData, {
      contentType: fileData.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  return NextResponse.json({ data: uploadData }, { status: 200 });
}
