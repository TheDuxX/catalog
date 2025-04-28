import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();

  const body = await req.json();
  const { userId } = body;

  const { error } = await supabase.rpc("delete_user", { user_id: userId });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  console.log(req);

  // const { email, password, username } = await req.json();
  const formData = await req.formData();
  const avatar = formData.get("avatar") as File;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  if (!email || !password || !username || !avatar) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  const buffer = Buffer.from(await avatar.arrayBuffer());
  const fileExt = avatar.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: publicUrl,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
