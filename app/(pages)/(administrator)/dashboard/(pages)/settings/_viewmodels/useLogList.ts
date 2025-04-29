import { useQuery } from "@tanstack/react-query";
import { getLogs } from "../_services/logs-service";

export const useLogList = () => {
  return useQuery({
    queryKey: ["logs"],
    queryFn: getLogs,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export function formatedDateandHour(date: string) {
  const dateObj = new Date(date);
  const datePart = dateObj.toLocaleDateString("pt-BR");
  const timePart = dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} às ${timePart}`;
}

export function badgeColors(type: string) {
  switch (type) {
    case "create":
      return "bg-green-500";
    case "delete":
      return "bg-red-500";
    case "update":
      return "bg-yellow-500";
  }
}
