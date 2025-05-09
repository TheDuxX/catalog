export type BannerProps = {
  id: string;
  name: string;
  is_visible: boolean;
  image_url: string;
  created_at: Date;
  order: number;
};

export async function getBanners() {
  const response = await fetch("/api/banners", { method: "GET" });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error("Erro ao buscar banners");
  }

  return response.json();
}
