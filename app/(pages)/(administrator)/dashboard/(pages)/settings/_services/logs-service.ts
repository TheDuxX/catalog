type ProductDetails = {
  name: string;
  price: string;
  status: boolean;
  imageUrls: string[];
  reference: string;
  description: string;
};

type UserDetails = {
  username: string;
  email: string;
  avatar?: string;
};

type BaseActionLog<T extends string, D> = {
  id: string;
  action: "create" | "update" | "delete";
  entity: T;
  entity_id: string;
  user_id: string;
  created_at: string; // ou Date
  details: D;
};

type ProductActionLog = BaseActionLog<"product", ProductDetails>;
type UserActionLog = BaseActionLog<"user", UserDetails>;

export type ActionLog = ProductActionLog | UserActionLog;

export const getLogs = async (): Promise<ActionLog[]> => {
  const response = await fetch("/api/logs", { method: "GET" });
  if (!response.ok) throw new Error("Erro ao buscar logs");
  return response.json();
};
