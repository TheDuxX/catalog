import { createClient } from "@/app/_utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let metadata = user?.user_metadata;
}
