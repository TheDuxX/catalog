import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, phone, message }]);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Contato enviado com sucesso", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
