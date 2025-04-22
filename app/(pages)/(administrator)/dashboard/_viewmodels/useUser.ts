"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { updateUserSchema } from "../_schemas/userSchema";
import {
  deleteUser,
  getUser,
  updateUser,
  UpdateUserData,
  uploadAvatar,
  UserData,
} from "../_services/user-service";

export const useUserViewModel = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário", error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.username ?? "",
      email: user?.email ?? "",
      avatar: user?.avatar ?? "",
    },
  });

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.username ?? "",
        email: user.email,
        avatar: user.avatar ?? "",
      });
    }
  }, [user]);

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    try {
      const parsed = updateUserSchema.safeParse(data);
      if (!parsed.success) {
        const formatted = parsed.error.format();
        throw new Error("Erro de validação: " + JSON.stringify(formatted));
      }

      const fileInput = document.getElementById(
        "avatar-upload"
      ) as HTMLInputElement;
      const files = fileInput?.files ? Array.from(fileInput.files) : [];

      let avatarUrl = user?.avatar;

      if (files.length > 0) {
        const [uploadedUrl] = await uploadAvatar(files[0], user?.id || "");
        avatarUrl = uploadedUrl;
      }

      const payload: UpdateUserData = {
        ...parsed.data,
        avatar: avatarUrl ?? "",
      };

      const updatedUser = await updateUser(payload);

      setUser(updatedUser);
      toast.success("Perfil atualizado com sucesso!");
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Erro ao atualizar perfil", error);
      toast.error("Erro ao atualizar perfil.");
      throw error;
    }
  };

  const deleteProfile = async () => {
    try {
      await deleteUser();
      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      throw error;
    }
  };

  const redirectToProfile = () => {
    router.push("/dashboard/settings/profile");
  };

  return {
    user,
    form,
    onSubmit,
    isLoading,
    updateProfile: onSubmit,
    deleteProfile,
    refetchUser: fetchUser,
    redirectToProfile,
  };
};
