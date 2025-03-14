import { createSupabaseClient } from "@/app/_utils/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Buscar categorias
    const { data: categories, error } = await supabase
      .from("category")
      .select("*");
    if (error) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    } else {
      res.status(200).json(categories);
    }
  } else if (req.method === "POST") {
    console.log("TESTE");
    // Criar nova categoria
    const { name } = req.body;

    // Verificar se o nome foi fornecido
    if (!name) {
      return res.status(400).json({ error: "Nome da categoria é obrigatório" });
    }

    try {
      // Inserir a categoria no banco de dados
      const { data: newCategory, error } = await supabase
        .from("category")
        .insert({ name })
        .single();

      // Verificar se houve erro na inserção
      if (error) {
        console.error("Erro ao criar categoria:", error); // Logando o erro para depuração
        return res
          .status(500)
          .json({ error: error.message || "Erro ao criar categoria" });
      }

      // Retornar a nova categoria criada
      return res.status(201).json(newCategory);
    } catch (error) {
      console.error("Erro inesperado:", error);
      return res
        .status(500)
        .json({ error: "Erro inesperado ao criar categoria" });
    }
  } else if (req.method === "PUT") {
    // Editar categoria
    const { id, name } = req.body;

    if (!id || !name) {
      return res
        .status(400)
        .json({ error: "ID e nome da categoria são obrigatórios" });
    }

    const { data: updatedCategory, error } = await supabase
      .from("category")
      .update({ name })
      .match({ id });

    if (error) {
      res.status(500).json({ error: "Erro ao editar categoria" });
    } else {
      res.status(200).json(updatedCategory);
    }
  } else if (req.method === "DELETE") {
    // Excluir categoria
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID da categoria é obrigatório" });
    }

    const { error } = await supabase.from("category").delete().match({ id });

    if (error) {
      res.status(500).json({ error: "Erro ao excluir categoria" });
    } else {
      res.status(204).end();
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
