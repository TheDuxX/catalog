"use client";

import { useEffect, useState } from "react";
import {
  deleteUser,
  getUser,
  updateUser,
  UpdateUserData,
  UserData,
} from "../_services/user-service";
import { useRouter } from "next/navigation";

export const useUserViewModel = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // GET
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

  // PUT
  const updateProfile = async (data: UpdateUserData) => {
    try {
      const updatedUser = await updateUser(data);
      setUser(updatedUser);
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
      throw error;
    }
  };

  // DELETE
  const deleteProfile = async () => {
    try {
      await deleteUser();
      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    isLoading,
    updateProfile,
    deleteProfile,
    refetchUser: fetchUser,
  };
};
