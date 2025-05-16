"use client";

import { useEffect, useState } from "react";
import { fetchActivities } from "../_services/activity-service";
import { ChartConfig } from "@/app/_components/ui/chart";

type Activity = {
  date: string;
  page_views: number;
  orders: number;
};

export const useActivityCharts = () => {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastWeeks, setLastWeeks] = useState<Activity[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const activityData = await fetchActivities();

        const sortedData = activityData.sort(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (a: Activity, b: Activity) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const lastWeek = sortedData.slice(-7);

        setLastWeeks(lastWeek);
        setActivity(activityData);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { activity, loading, lastWeeks };
};

export const chartConfig = {
  activity: {
    label: "Atividades",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Pedidos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
