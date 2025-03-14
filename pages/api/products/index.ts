import { createSupabaseClient } from "@/app/_utils/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createSupabaseClient();

  if (req.method === "GET") {
    try {
      // Busca todos os produtos
      const { data: products, error } = await supabase
        .from("product")
        .select("*");

      if (error) {
        console.error("Erro ao buscar produtos:", error);
        return res.status(500).json({ error: "Erro ao buscar produtos" });
      }

      res.status(200).json(products);
    } catch (error) {
      console.error("Erro interno:", error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  } else if (req.method === "POST") {
    const {
      name,
      description,
      price,
      reference,
      category,
      mark,
      images,
      views,
    } = req.body;

    try {
      // Cria um novo produto
      const { data: newProduct, error } = await supabase
        .from("product")
        .insert([
          {
            name,
            description,
            price,
            reference,
            category_id: category,
            mark_id: mark,
            image_urls: images,
            date: new Date().toISOString(),
            status: true,
            views,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar produto:", error);
        return res.status(500).json({ error: "Erro ao criar produto" });
      }

      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
