"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserSchema } from "../_schemas/userSchema";
import {
  getUser,
  updateUser,
  UpdateUserData,
  uploadAvatar,
} from "../_services/user-service";
import { useEffect } from "react";

export const useUserViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 🟡 QUERY: Fetch user
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  // 🟡 FORM
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
    },
  });

  // 🟡 Atualiza valores do form quando user estiver disponível
  // sem depender de estado manual
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.username ?? "",
        email: user.email ?? "",
        avatar: user.avatar ?? "",
      });
    }
  }, [user, form]);

  // 🟡 MUTATION: Atualiza usuário
  const updateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof updateUserSchema>) => {
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

      return updateUser(payload);
    },
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil", error);
      toast.error("Erro ao atualizar perfil.");
    },
  });

  const updateProfile = (data: z.infer<typeof updateUserSchema>) => {
    return updateMutation.mutateAsync(data);
  };

  const redirectToProfile = () => {
    router.push("/dashboard/settings/profile");
  };

  return {
    user,
    form,
    isLoading,
    updateProfile,
    refetchUser,
    redirectToProfile,
  };
};
