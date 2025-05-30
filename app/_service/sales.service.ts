// chamar API activity/orders

export const fetchSales = async () => {
    const res = await fetch("/api/activity/orders", { method: "PUT" });
    if (!res.ok) throw new Error("Erro ao buscar vendas");
    return res.json();
}