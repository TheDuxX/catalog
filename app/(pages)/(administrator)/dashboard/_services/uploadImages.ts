import { createSupabaseClient } from "@/app/_utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

export async function uploadImages(files: File[]): Promise<string[]> {
  const supabase = await createSupabaseClient();
  const uploads = files.map(async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from("tratorino-pics")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) throw new Error("Erro ao fazer upload de imagem");

    const { data } = supabase.storage
      .from("tratorino-pics")
      .getPublicUrl(filePath);

    return data.publicUrl;
  });

  return await Promise.all(uploads);
}

export async function deleteImages(urls: string[]) {
  const supabase = await createSupabaseClient();

  const deletes = urls.map(async (url) => {
    const { error } = await supabase.storage
      .from("tratorino-pics")
      .remove([url]);

    if (error) throw new Error("Erro ao deletar imagem");
  });

  return await Promise.all(deletes);
}
