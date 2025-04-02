export const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    return res.json();
  };
  