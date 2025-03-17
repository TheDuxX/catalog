import { createClient } from "@/app/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("categories")?.split(",") || [];
  const mark = searchParams.get("marks")?.split(",") || [];
  const status = searchParams.get("status");
  const sort = searchParams.get("sort");

  let query = supabase.from("product").select("*");

  if (category.length > 0 || mark.length > 0 || status) {
    const filters = [];
    if (category.length > 0) {
      filters.push(`category:categoryId(name).in.(${category.join(",")})`);
    }
    if (mark.length > 0) {
      filters.push(`mark:markId(name).in.(${mark.join(",")})`);
    }
    if (status) {
      filters.push(`status.eq.${status}`);
    }
    query = query.or(filters.join(","));
  }

  if (sort) {
    const [column, order] = sort.split(":");
    query = query.order(column, { ascending: order === "asc" });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}
