export async function fetchSearchResults(query: string) {
  const res = await fetch(`/api/products/search?query=${query}`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}
