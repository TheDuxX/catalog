"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  chartConfig,
  useActivityCharts,
} from "../_viewmodels/useActivityCharts";
import { ChartContainer } from "@/app/_components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts";

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
        <h2 className="font-medium text-xl">Visitas ao site</h2>
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
            <Tooltip
              isAnimationActive={false}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "5px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
              labelFormatter={(label) => {
                const [year, month, day] = label.split("-");
                return `${day}/${month}`;
              }}
              formatter={(value, name) => [
                `${value}`,
                name === "page_views" ? "Visualizações" : "Pedidos",
              ]}
            />
            <Bar
              dataKey="page_views"
              fill="var(--color-activity)"
              radius={5}
              barSize={50}
            />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="bg-white rounded-md shadow p-4 w-full">
        <h2 className="font-medium text-xl">Pedidos</h2>
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
            <Tooltip
              isAnimationActive={false}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "5px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
              labelFormatter={(label) => {
                const [year, month, day] = label.split("-");
                return `${day}/${month}`;
              }}
              formatter={(value, name) => [
                `${value}`,
                name === "page_views" ? "Visualizações" : "Pedidos",
              ]}
            />
            <Bar
              dataKey="orders"
              fill="var(--color-orders)"
              radius={5}
              barSize={50}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MetricCharts;
