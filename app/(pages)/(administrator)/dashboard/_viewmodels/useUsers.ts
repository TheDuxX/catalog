"use client";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../_services/users-service";

export const useUsersList = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
