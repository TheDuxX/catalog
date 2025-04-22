export type UserData = {
  id: string;
  email: string;
  username: string | null;
  avatar: string | null;
};

export type UpdateUserData = {
  username?: string;
  avatar?: string;
};

export const getUser = async (): Promise<UserData> => {
  const res = await fetch("/api/user", {
    method: "GET",
  });

  if (!res.ok) throw new Error("Erro ao buscar usuário");

  return res.json();
};

export const updateUser = async (data: UpdateUserData): Promise<UserData> => {
  const res = await fetch("/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar usuário");

  return res.json();
};

export const deleteUser = async (): Promise<void> => {
  const res = await fetch("/api/user", {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar usuário");
};
