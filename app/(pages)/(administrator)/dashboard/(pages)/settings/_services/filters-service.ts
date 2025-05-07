export type Category = {
  id: string;
  name: string;
  product_count: number;
};

const API_URL_CATEGORY = "/api/category";
const API_URL_MARK = "/api/mark";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(API_URL_CATEGORY, { cache: "no-store" });
    if (!res.ok) throw new Error("Erro ao buscar categorias");
    return res.json();
  },

  async create(data: { name: string }): Promise<Category> {
    const res = await fetch(API_URL_CATEGORY, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Erro ao criar categoria");
    return res.json();
  },

  async update(data: { id: string; name: string }): Promise<Category> {
    const res = await fetch(API_URL_CATEGORY, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Erro ao atualizar categoria");
    return res.json();
  },

  async remove(id: string): Promise<{ message: string }> {
    const res = await fetch(API_URL_CATEGORY, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Erro ao deletar categoria");

    return res.json(); // Isso retorna { message: "Categoria deletada com sucesso." }
  },
};

export const markService = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(API_URL_MARK, { cache: "no-store" });
    if (!res.ok) throw new Error("Erro ao buscar categorias");
    return res.json();
  },

  async create(data: { name: string }): Promise<Category> {
    const res = await fetch(API_URL_MARK, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Erro ao criar categoria");
    return res.json();
  },

  async update(data: { id: string; name: string }): Promise<Category> {
    const res = await fetch(API_URL_MARK, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Erro ao atualizar categoria");
    return res.json();
  },

  async remove(id: string): Promise<void> {
    const res = await fetch(API_URL_MARK, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Erro ao deletar categoria");
  },
};
