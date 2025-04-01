"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  chartConfig,
  useActivityCharts,
} from "../_viewmodels/useActivityCharts";
import { ChartContainer } from "@/app/_components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const MetricCharts = () => {
  const { activity, lastWeeks, loading } = useActivityCharts();
  chartConfig;

  if (loading)
    return (
      <Skeleton className="flex w-full gap-4 bg-white rounded-md shadow p-4 h-full">
        Carregando...
      </Skeleton>
    );

  return (
    <div className="flex md:flex-row flex-col w-full gap-4 ">
      <div className="bg-white rounded-md shadow p-4 w-full">
        <h2 className="font-medium text-xl">Visitas nos últimos 15 dias</h2>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={lastWeeks}>
            <CartesianGrid
              vertical={false}
              className=""
              stroke="hsl(var(--sidebar-border))"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => {
                const [year, month, day] = value.split("-");
                return `${day}/${month}`;
              }}
            />
            <Bar
              dataKey="page_views"
              fill="var(--color-activity)"
              radius={20}
            />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="bg-white rounded-md shadow p-4 w-full">
        <h2 className="font-medium text-xl">Pedidos nos últimos 15 dias</h2>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={lastWeeks}>
            <CartesianGrid
              vertical={false}
              className=""
              stroke="hsl(var(--sidebar-border))"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => {
                const [year, month, day] = value.split("-");
                return `${day}/${month}`;
              }}
            />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={20} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MetricCharts;
