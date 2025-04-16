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
