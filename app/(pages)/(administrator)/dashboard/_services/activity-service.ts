export const fetchActivities = async () => {
    const res = await fetch("/api/activity");
    if (!res.ok) throw new Error("Erro ao buscar atividades");
    return res.json();
}