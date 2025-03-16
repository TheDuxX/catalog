import { createClient } from "@/app/_utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient(); // Add await here

  const { data, error } = await supabase.from("product").select(`id, name, description, reference, status, price, date, "imageUrls", views, categoryId,
    category:categoryId(name), markId,
    mark:markId(name)`);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}