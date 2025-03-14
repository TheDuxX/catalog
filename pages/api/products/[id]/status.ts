// /api/products/[id]/status.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/supabase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID do produto é obrigatório" });
  }

  if (req.method === "PATCH") {
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({ error: "Status deve ser um valor booleano" });
    }

    const supabase = createClient();

    try {
      // Atualiza o status do produto com o ID fornecido
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar o status do produto:", error);
        return res.status(500).json({ error: "Erro ao atualizar o status do produto" });
      }

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Erro interno ao atualizar o status do produto:", error);
      return res.status(500).json({ error: "Erro interno ao atualizar o status do produto" });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
