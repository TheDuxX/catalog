// /api/products/[id]/delete.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/supabase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID do produto é obrigatório" });
  }

  if (req.method === "DELETE") {
    const supabase = createClient();

    try {
      // Deleta o produto com o ID fornecido
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Erro ao deletar produto:", error);
        return res.status(500).json({ error: "Erro ao deletar produto" });
      }

      return res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error) {
      console.error("Erro interno ao deletar produto:", error);
      return res.status(500).json({ error: "Erro interno ao deletar produto" });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
