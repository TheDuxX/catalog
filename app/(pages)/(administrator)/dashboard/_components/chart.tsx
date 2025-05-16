"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  chartConfig,
  useActivityCharts,
} from "../_viewmodels/useActivityCharts";
import { ChartContainer } from "@/app/_components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts";

const MetricCharts = () => {
  const { lastWeeks, loading } = useActivityCharts();  

  if (loading)
    return (
      <Skeleton className="flex w-full gap-4 bg-white rounded-md shadow p-4 h-full">
        Carregando...
      </Skeleton>
    );

  return (
    <div className="flex lg:flex-row flex-col w-full gap-2 ">
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-lg">Visitas ao Site</h2>
        <div className="bg-white rounded-md shadow p-2 pb-0 w-full">
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
                  const [month, day] = value.split("-");
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
                  const [month, day] = label.split("-");
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
      </div>
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-lg">Pedidos</h2>
        <div className="bg-white rounded-md shadow p-2 pb-0 w-full">
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
                  const [month, day] = value.split("-");
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
                  const [month, day] = label.split("-");
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
    </div>
  );
};

export default MetricCharts;
