"use client";
import { useEffect, useState } from "react";
import { fetchActivities } from "../_services/activity-service";
import { fetchProducts } from "../_services/product-service";

type Activity = {
  date: string;
  page_views: number;
  orders: number;
};

export const useActivitycharts = () => {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewsChange, setViewsChange] = useState<number | null>(null);
  const [ordersChange, setOrdersChange] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [activityData, productsData] = await Promise.all([
          fetchActivities(),
          fetchProducts(),
        ]);

        setActivity(activityData);
        setTotalProducts(productsData.length);

        // Ordenar os dados por data
        const sortedData = activityData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Capturar a data de hoje e calcular períodos
        const today = new Date();
        const last7DaysStart = new Date();
        last7DaysStart.setDate(today.getDate() - 6); // Últimos 7 dias incluem hoje

        const prev7DaysStart = new Date();
        prev7DaysStart.setDate(last7DaysStart.getDate() - 7); // 7 dias antes dos últimos 7 dias

        const prev7DaysEnd = new Date();
        prev7DaysEnd.setDate(last7DaysStart.getDate() - 1); // Um dia antes do último período de 7 dias

        // Filtrar os últimos 7 dias
        const last7Days = sortedData.slice(-7);

        // Filtrar os 7 dias anteriores
        const prev7Days = sortedData.filter((item: any) => {
          const itemDate = new Date(item.date);
          return itemDate >= prev7DaysStart && itemDate <= prev7DaysEnd;
        });

        // Somar total de visualizações e pedidos para cada período
        const sumViews = (data: Activity[]) => data.reduce((acc, curr) => acc + curr.page_views, 0);
        const sumOrders = (data: Activity[]) => data.reduce((acc, curr) => acc + curr.orders, 0);

        const viewsLast7Days = sumViews(last7Days);
        const viewsPrev7Days = sumViews(prev7Days);
        const ordersLast7Days = sumOrders(last7Days);
        const ordersPrev7Days = sumOrders(prev7Days);

        setTotalViews(viewsLast7Days);
        setTotalOrders(ordersLast7Days);

        // Calcular variação percentual
        const calculateChange = (current: number, previous: number) => {
          if (previous === 0) return current > 0 ? 100 : 0;
          return ((current - previous) / previous) * 100;
        };

        setViewsChange(calculateChange(viewsLast7Days, viewsPrev7Days));
        setOrdersChange(calculateChange(ordersLast7Days, ordersPrev7Days));

      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { activity, totalViews, totalOrders, totalProducts, viewsChange, ordersChange, loading };
};
