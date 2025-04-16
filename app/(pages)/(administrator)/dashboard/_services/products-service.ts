export async function fetchProducts(params: URLSearchParams) {
  const res = await fetch(`/api/filters?${params.toString()}`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}
