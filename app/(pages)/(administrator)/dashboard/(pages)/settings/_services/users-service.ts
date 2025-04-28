import { createSupabaseClient } from "@/app/_utils/supabase/client";

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

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`/api/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao deletar usuário.");
  }
};

export async function signup(formData: FormData) {
  console.log("Signup data:", formData);

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Erro ao registrar novo usuário.");
    }

    const responseData = await response.json();

    const userId = responseData?.user?.id;

    if (!userId) throw new Error("Id do usuário não retornado.");

    return { success: true, userId };
  } catch (err: any) {
    console.error("Erro em signup:", err);
    return {
      success: false,
      error: err.message || "Erro ao cadastrar novo usuário.",
    };
  }
}
