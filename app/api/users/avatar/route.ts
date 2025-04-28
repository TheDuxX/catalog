import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const formData = await req.formData();
  const avatar = formData.get("avatar") as File;
  const userId = formData.get("userId") as string;

  if (!avatar || !userId) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const buffer = Buffer.from(await avatar.arrayBuffer());
  const fileExt = avatar.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, buffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: avatar.type,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar: publicUrl })
    .eq("id", userId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ avatarUrl: publicUrl }, { status: 200 });
}
