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

export async function create(data: BannerProps) {
  const res = await fetch("/api/banners", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Erro ao criar banner");
  return res.json();
}

export async function bulkUpdate(
  banners: { id: string; is_visible?: boolean; order?: number }[]
) {
  const res = await fetch("/api/banners/bulk-update", {
    method: "PUT",
    body: JSON.stringify(banners),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Erro ao atualizar banners");
  return res.json();
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
