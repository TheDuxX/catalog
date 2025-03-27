export const fetchProducts = async (query: string) => {
  const res = await fetch(`/api/products?search=${query}`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return await res.json();
};
