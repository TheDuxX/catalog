"use client";
import { useEffect, useState } from "react";
import {
  deleteUser,
  getUsers,
  signup,
  UserData,
} from "../_services/users-service";
import toast from "react-hot-toast";
import {
  passwordSchema,
  signupSchema,
} from "@/app/(pages)/(auth)/login/_models/authSchema";

export function useUserManagent() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    avatar: null as File | null,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("pt-BR");
    const timePart = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} às ${timePart}`;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteUser(id);

      toast.success("Usuário deletado com sucesso!");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast.error("Erro ao deletar usuário.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  const createUser = async () => {
    const result = signupSchema
      .refine((data) => passwordSchema.safeParse(data.password).success, {
        message: "Invalid password",
        path: ["password"],
      })
      .safeParse(formData);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("password", formData.password);

      if (formData.avatar instanceof File) {
        form.append("avatar", formData.avatar);
      }

      const response = await signup(form);

      if (response?.success) {
        toast.success("Usuário criado com sucesso!");
      } else {
        toast.error("Erro ao criar usuário!");
      }
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    formData,
    errors,
    isLoading,
    formatDate,
    handleChange,
    handleDeleteUser,
    createUser,
    isDeleting,
    handleAvatarChange,
  };
}
