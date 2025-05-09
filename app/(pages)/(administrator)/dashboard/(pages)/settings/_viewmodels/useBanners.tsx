"use client";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../_services/banners-service";

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
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
