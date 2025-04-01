"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { createClient } from "@/app/_utils/supabase/server";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, Tooltip, Legend, CartesianGrid } from "recharts";

interface ActivityData {
  date: string;
  orders: number;
  page_views: number;
}

const chartConfig = {
  orders: {
    label: "Pedidos",
    color: "#ff4a49",
  },
  page_views: {
    label: "Acessos",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const ChartsActivity = () => {
  const [activity, setActivity] = useState<ActivityData[]>([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      const supabase = await createClient();
      const { data: siteActivity, error } = await supabase
        .from("site_activity")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        toast.error("Erro ao buscar atividades");
        return;
      }

      if (siteActivity) {
        setActivity(
          siteActivity.map((item: any) => ({
            date: format(parseISO(item.date), "dd/MM"), // Formata a data para dia/mês
            orders: Number(item.orders), // Garante que os valores sejam números
            page_views: Number(item.page_views),
          }))
        );
      }
    };

    fetchActivityData();
  }, []);

  return (
    <div className="w-full h-auto bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Atividade do Site</h2>
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart data={activity}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            opacity={0}
            tickLine={false}
            height={10}
            tickMargin={0}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 2)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="page_views"
            fill="var(--color-page_views)"
            radius={4}
            name="Acessos"
          />
          <Bar
            dataKey="orders"
            fill="var(--color-orders)"
            radius={4}
            name="Pedidos"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartsActivity;
