"use client";

import { useQuery } from "@tanstack/react-query"; // Importe useQuery
import { TrendingDown, TrendingUp } from "lucide-react";
import { fetchActivities } from "../_services/activity-service";
import { fetchProducts } from "../_services/products-service";

type Activity = {
  date: string;
  page_views: number;
  orders: number;
};

// Função para processar os dados de atividade (movida para fora do hook para clareza)
const processActivityData = (activityData: Activity[]) => {
  // Ordenar os dados por data
  const sortedData = [...activityData].sort(
    // Use spread para não mutar o array original
    (a: Activity, b: Activity) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = new Date();
  // Para garantir que "hoje" seja apenas o dia anterior completo, ajustamos a data
  const last7DaysEnd = new Date(today);
  last7DaysEnd.setDate(today.getDate() - 1); // Dia anterior
  last7DaysEnd.setHours(23, 59, 59, 999); // Fim do dia

  const last7DaysStart = new Date(today);
  last7DaysStart.setDate(today.getDate() - 7); // 7 dias atrás
  last7DaysStart.setHours(0, 0, 0, 0); // Início do dia

  const prev7DaysEnd = new Date(last7DaysStart);
  prev7DaysEnd.setDate(last7DaysStart.getDate() - 1); // Fim do período anterior
  prev7DaysEnd.setHours(23, 59, 59, 999);

  const prev7DaysStart = new Date(prev7DaysEnd);
  prev7DaysStart.setDate(prev7DaysEnd.getDate() - 6); // 7 dias antes do período anterior
  prev7DaysStart.setHours(0, 0, 0, 0);

  const last7Days = sortedData.filter((item: Activity) => {
    const itemDate = new Date(item.date);
    return itemDate >= last7DaysStart && itemDate <= last7DaysEnd;
  });

  const prev7Days = sortedData.filter((item: Activity) => {
    const itemDate = new Date(item.date);
    return itemDate >= prev7DaysStart && itemDate <= prev7DaysEnd;
  });

  const sumViews = (data: Activity[]) =>
    data.reduce((acc, curr) => acc + curr.page_views, 0);
  const sumOrders = (data: Activity[]) =>
    data.reduce((acc, curr) => acc + curr.orders, 0);

  const viewsLast7Days = sumViews(last7Days);
  const viewsPrev7Days = sumViews(prev7Days);
  const ordersLast7Days = sumOrders(last7Days);
  const ordersPrev7Days = sumOrders(prev7Days);

  // Calcular variação percentual
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const viewsChange = calculateChange(viewsLast7Days, viewsPrev7Days);
  const ordersChange = calculateChange(ordersLast7Days, ordersPrev7Days);

  return {
    activity: activityData, // Retorna os dados brutos também se necessário
    totalViews: viewsLast7Days,
    totalOrders: ordersLast7Days,
    viewsChange,
    ordersChange,
  };
};

export const useActivitycards = () => {
  const {
    data, // 'data' conterá o resultado de processActivityData e productsData
    isLoading, // 'isLoading' substitui seu 'loading' state
    error, // 'error' para qualquer erro de fetch ou processamento
  } = useQuery({
    queryKey: ["activityCardsData"], // Chave única para o cache do React Query
    queryFn: async () => {
      // Esta função será executada apenas uma vez (ou quando a query for invalidada)
      const [activityData, productsData] = await Promise.all([
        fetchActivities(),
        fetchProducts(),
      ]);

      const processedActivity = processActivityData(activityData);
      const totalProducts = productsData.length;

      return { ...processedActivity, totalProducts }; // Retorne todos os dados processados
    },
    // Adicione outras opções do React Query se necessário, por exemplo:
    // staleTime: 5 * 60 * 1000, // Dados considerados "fresh" por 5 minutos
    // refetchOnWindowFocus: true, // Re-busca quando a janela volta ao foco
    // retry: 3, // Tenta novamente 3 vezes em caso de falha
  });

  // Extraia os valores do 'data' se estiverem disponíveis
  const activity = data?.activity || [];
  const totalViews = data?.totalViews || 0;
  const totalOrders = data?.totalOrders || 0;
  const totalProducts = data?.totalProducts || 0;
  const viewsChange = data?.viewsChange ?? null; // Use ?? para nullish coalescing
  const ordersChange = data?.ordersChange ?? null;

  // Lidar com o estado de erro, se necessário
  if (error) {
    console.error("Erro ao carregar dados com React Query:", error);
    // Você pode retornar valores padrão ou lançar o erro novamente
  }

  return {
    activity,
    totalViews,
    totalOrders,
    totalProducts,
    viewsChange,
    ordersChange,
    loading: isLoading, // Renomeie isLoading para 'loading' se quiser manter a interface do hook
  };
};

// As funções formatChange e trendingMarks não precisam de alteração
const formatChange = (value: number | null) => {
  if (value === null) return "N/A";
  return `${value.toFixed(0)}%`;
};

export const trendingMarks = (number: number | null) => {
  if (number === null || number === undefined) {
    return (
      <div className="text-gray-500">
        <div className="flex flex-row gap-1">
          <p>--</p>
          {formatChange(number)}
        </div>
      </div>
    );
  }

  switch (true) {
    case number > 0:
      return (
        <div className="text-green-500">
          <div className="flex flex-row gap-1">
            <TrendingUp size={16} />
            <p>+</p>
            {formatChange(number)}
          </div>
        </div>
      );
    case number < 0:
      return (
        <div className="text-red-500">
          <div className="flex flex-row gap-1">
            <TrendingDown size={16} />
            <p>-</p>
          </div>
        </div>
      );
    case number === 0:
      return (
        <div className="text-gray-500">
          <div className="flex flex-row gap-1">
            <p>--</p>
            {formatChange(number)}
          </div>
        </div>
      );
    default:
      throw new Error(`Unexpected number value: ${number}`);
  }
};
