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

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const file = formData.get("image") as File;

  console.log(name, file);

  if (!file || !name) {
    return NextResponse.json(
      { error: "Nome e imagem são obrigatórios" },
      { status: 400 }
    );
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${name.toLowerCase().split(" ").join("-")}.${fileExt}`;
  const filePath = `${fileName}`;

  console.log("filePath", filePath);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("banners")
    .upload(filePath, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: "Erro ao fazer upload da imagem" },
      { status: 500 }
    );
  } else {
    console.log("Arquivo enviado com sucesso:", uploadData);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("banners").getPublicUrl(filePath);

  console.log(publicUrl);

  const { data: createdBanner, error } = await supabase
    .from("banners")
    .insert({
      name: name,
      image_url: publicUrl,
      is_visible: true,
    })
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
      entity: "banners",
      entity_id: createdBanner.id,
      user_id: user.id,
      details: `Criou o banner "${createdBanner.name}"`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de criação de banner:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(
    { message: "Banner criado com sucesso" },
    { status: 200 }
  );
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

  const { data: updatedBanners, error } = await supabase
    .from("banners")
    .upsert(updates, {
      onConflict: "id",
    });

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
      entity: "banners",
      entity_id: null,
      user_id: user.id,
      details: `Atualizou a posição dos banners`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de atualização de banner:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(
    { message: "Banners atualizados com sucesso" },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const { id } = body;

  const { data: banner, error: fetchError } = await supabase
    .from("banners")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const filePath = banner?.image_url?.split(
    "/storage/v1/object/public/banners/"
  )[1];

  if (filePath) {
    const { error: deleteImageError } = await supabase.storage
      .from("banners")
      .remove([filePath]);

    if (deleteImageError) {
      return NextResponse.json(
        { error: `Erro ao deletar imagem: ${deleteImageError.message}` },
        { status: 500 }
      );
    }
  }

  const { data: deletedBanner, error } = await supabase
    .from("banners")
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
      action: "delete",
      entity: "banners",
      entity_id: deletedBanner.id,
      user_id: user.id,
      details: `Deletou o banner "${deletedBanner.name}"`,
    });

    if (logError) {
      console.error(
        "Erro ao registrar log de exclusão de banner:",
        logError.message
      );
    }
  } catch (logException) {
    console.error("Exceção ao tentar registrar log:", logException);
  }

  return NextResponse.json(
    { message: "Banner deletado com sucesso" },
    { status: 200 }
  );
}
