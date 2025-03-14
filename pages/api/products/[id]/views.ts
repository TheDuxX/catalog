import { createClient } from "@/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID do produto é obrigatório" });
  }

  if (req.method === "PATCH") {
    const supabase = createClient();

    try {
      // Incrementa o campo de visualizações (views)
      const { data: product, error } = await supabase
        .from("products")
        .update({
          views: supabase.rpc("increment", { column_name: "views", amount: 1 }),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar visualizações:", error);
        return res.status(500).json({ error: "Erro ao atualizar visualizações do produto" });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error("Erro interno ao atualizar visualizações:", error);
      return res.status(500).json({ error: "Erro interno ao atualizar visualizações do produto" });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
