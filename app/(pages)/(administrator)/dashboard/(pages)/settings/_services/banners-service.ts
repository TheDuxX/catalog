export type BannerProps = {
  id: string;
  name: string;
  is_visible: boolean;
  image_url: string;
  created_at: Date;
  order: number;
};

export type BannerUpdatePayload = {
  id: string;
  is_visible?: boolean;
  order?: number;
}[];

export async function getBanners() {
  const response = await fetch("/api/banners", { method: "GET" });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error("Erro ao buscar banners");
  }

  return response.json();
}

export async function create(data: { name: string; image: File }) {
  console.log("Iniciando criação",data);

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("image", data.image);

  const res = await fetch("/api/banners", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Erro ao criar banner");
  return res.json();
}

export async function bulkUpdate(banners: Partial<BannerProps>[]) {
  console.log("Enviando para a API:", banners);
  try {
    const res = await fetch("/api/banners", {
      method: "PUT",
      body: JSON.stringify(banners),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erro da API:", errorData);
      throw new Error(
        `Erro ao atualizar banners: ${res.status} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await res.json();
    console.log("Resposta da API:", data);
    return data;
  } catch (error: any) {
    console.error("Erro na função bulkUpdate:", error);
    throw error;
  }
}

export async function remove(id: string) {
  const res = await fetch("/api/banners", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Erro ao deletar banner");
}
