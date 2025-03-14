import { createSupabaseClient } from "@/app/_utils/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Buscar marcas
    const { data: categories, error } = await supabase.from("mark").select("*");
    if (error) {
      res.status(500).json({ error: "Erro ao buscar marcas" });
    } else {
      res.status(200).json(categories);
    }
  } else if (req.method === "POST") {
    // Criar nova marca
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome da marca é obrigatório" });
    }

    const { data: newMark, error } = await supabase
      .from("mark")
      .insert([{ name }])
      .single();

    if (error) {
      res.status(500).json({ error: "Erro ao criar marca" });
    } else {
      res.status(201).json(newMark);
    }
  } else if (req.method === "PUT") {
    // Editar marca
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ error: "ID e nome da marca são obrigatórios" });
    }

    const { data: updatedMark, error } = await supabase
      .from("mark")
      .update({ name })
      .match({ id });

    if (error) {
      res.status(500).json({ error: "Erro ao editar marca" });
    } else {
      res.status(200).json(updatedMark);
    }
  } else if (req.method === "DELETE") {
    // Excluir marca
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID da marca é obrigatório" });
    }

    const { error } = await supabase.from("mark").delete().match({ id });

    if (error) {
      res.status(500).json({ error: "Erro ao excluir marca" });
    } else {
      res.status(204).end();
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
