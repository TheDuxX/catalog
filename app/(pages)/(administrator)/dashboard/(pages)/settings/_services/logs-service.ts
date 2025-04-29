export type Log = {
  id: string;
  action: string;
  entity: string;
  entity_id: string;
  user_id: string;
  created_at: string;
  details: string;
};

export const getLogs = async () => {
  const response = await fetch("/api/logs", { method: "GET" });
  if (!response.ok) throw new Error("Erro ao buscar logs");
  return response.json();
};
