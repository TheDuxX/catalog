"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteUser as deleteUserApi,
  getUsers,
  signup,
  UserData,
} from "../_services/users-service";
import toast from "react-hot-toast";
import {
  passwordSchema,
  signupSchema,
} from "@/app/(pages)/(auth)/login/_models/authSchema";

const fetchUsers = async (): Promise<UserData[]> => {
  try {
    const usersData = await getUsers();
    return usersData;
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);
    toast.error("Erro ao buscar usuários.");
    throw error;
  }
};

export const useUsersQuery = () => {
  return useQuery<UserData[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export function useUserManagment() {
  const [formData, setFormData] = useState({
    username: "",
    avatar: null as File | null,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const queryClient = useQueryClient();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("pt-BR");
    const timePart = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} às ${timePart}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  const deleteUserMutation = useMutation<void, Error, string>({
    mutationFn: (userId: string) => deleteUserApi(userId),
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Erro ao deletar usuário:", error);
      toast.error("Erro ao deletar usuário.");
    },
  });

  const handleDeleteUser = async (userId: string) => {
    console.log("Deletando usuário:", userId);
    deleteUserMutation.mutate(userId);
  };

  const createUserMutation = useMutation<any, Error, FormData>({
    mutationFn: (form: FormData) => signup(form),
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: null,
      });
    },
    onError: (error: Error) => {
      console.error("Erro ao criar usuário", error);
      toast.error("Erro ao criar usuário!");
    },
  });

  const createUser = async () => {
    const result = signupSchema
      .refine((data) => passwordSchema.safeParse(data.password).success, {
        message: "Invalid password",
        path: ["password"],
      })
      .safeParse(formData);

    if (!result.success) {
      console.error(result.error);
      result.error.errors.forEach((err) => {
        toast.error(`${err.message}`, {
          duration: 5000,
        });
      });
      return;
    }

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);

    if (formData.avatar instanceof File) {
      form.append("avatar", formData.avatar);
    }

    createUserMutation.mutate(form);
  };

  return {
    formData,
    formatDate,
    handleChange,
    handleDeleteUser,
    createUser,
    handleAvatarChange,
    isDeleting: deleteUserMutation.isPending,
    isCreating: createUserMutation.isPending,
  };
}
