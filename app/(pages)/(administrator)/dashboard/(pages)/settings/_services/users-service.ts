export type UserData = {
  id: string;
  username: string | null;
  avatar: string | null;
  updated_at: string;
};

export const getUsers = async (): Promise<UserData[]> => {
  const res = await fetch(`/api/users`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Erro ao buscar usuários");

  return res.json();
};
