"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BannerProps,
  bulkUpdate,
  create,
  getBanners,
  remove,
} from "../_services/banners-service";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useBannersMutations = () => {
  const queryClient = useQueryClient();

  const createBanner = useMutation({
    mutationFn: (data: BannerProps) => create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner criado com sucesso.");
    },
  });

  const deleteBanner = useMutation({
    mutationFn: (id: string) => remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner deletado com sucesso.");
    },
  });

  const updateAllBanners = useMutation({
    mutationFn: bulkUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Alterações salvas com sucesso.");
    },
  });

  return { createBanner, deleteBanner, updateAllBanners };
};

// função que formate data para o formato brasileiro com dia,mês, ano e horas
export const formattedData = (data: Date) => {
  const date = new Date(data);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const useBannerFunctions = () => {
  const [editedBanners, setEditedBanners] = useState<BannerProps[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const updateEditedBanner = (id: string, changes: Partial<BannerProps>) => {
    setEditedBanners((prev) => {
      const existing = prev.find((b) => b.id === id);

      if (existing) {
        return prev.map((b) => (b.id === id ? { ...b, ...changes } : b));
      }

      const banners = useBanners().data || [];

      const original = banners.find((b: any) => b.id === id);
      if (!original) return prev;

      return [...prev, { ...original, ...changes }];
    });

    setHasUnsavedChanges(true);
  };
  return {
    editedBanners,
    setEditedBanners,
    updateEditedBanner,
    hasUnsavedChanges,
    setHasUnsavedChanges,
  };
};


