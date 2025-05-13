"use client";
import { useEffect, useState } from "react";
import { fetchActivities } from "../_services/activity-service";
import { fetchProducts } from "../_services/products-service";
import { TrendingDown, TrendingUp } from "lucide-react";

type Activity = {
  date: string;
  page_views: number;
  orders: number;
};

export const useActivitycards = () => {
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
        const sortedData = activityData.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const today = new Date();
        const last7DaysEnd = new Date(today);
        last7DaysEnd.setDate(today.getDate() - 1);
        const last7DaysStart = new Date(today);
        last7DaysStart.setDate(today.getDate() - 7);
        const prev7DaysEnd = new Date(last7DaysStart);
        prev7DaysEnd.setDate(last7DaysStart.getDate() - 1);

        const prev7DaysStart = new Date(prev7DaysEnd);
        prev7DaysStart.setDate(prev7DaysEnd.getDate() - 6);

        const last7Days = sortedData.filter((item: any) => {
          const itemDate = new Date(item.date);
          return itemDate >= last7DaysStart && itemDate <= last7DaysEnd;
        });

        const prev7Days = sortedData.filter((item: any) => {
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

  return {
    activity,
    totalViews,
    totalOrders,
    totalProducts,
    viewsChange,
    ordersChange,
    loading,
  };
};

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
