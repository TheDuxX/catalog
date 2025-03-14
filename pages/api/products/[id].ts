import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/supabase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, description, reference, categoryId, markId, price, imageUrls } = req.body;

    console.log(req.body)
    if (!id) {
      return res.status(400).json({ error: "ID do produto é obrigatório" });
    }

    const supabase = createClient();

    try {
      // Atualiza o produto com os dados fornecidos
      const { data: updatedProduct, error } = await supabase
        .from("product")
        .update({
          name: name,
          description: description,
          reference: reference,
          categoryId: categoryId,
          markId: markId,
          price: price,
          imageUrls: imageUrls,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar o produto:", error);
        return res.status(500).json({ error: "Erro ao atualizar o produto" });
      }

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      return res.status(500).json({ error: "Erro interno ao atualizar o produto" });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
