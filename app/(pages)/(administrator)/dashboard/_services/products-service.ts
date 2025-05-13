export type ProductsProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  status: boolean;
  reference: string;
  date: Date;
  categoryId: string;
  markId: string;
  imageUrls: string[];
  views: number | null;
  category: {
    id: string;
    name: string;
  };
  mark: {
    id: string;
    name: string;
  };
};

export async function fetchFilterProducts(params: URLSearchParams) {
  const res = await fetch(`/api/filters?${params.toString()}`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}
