"use client";
import { Suspense } from "react";
import MetricCards from "./_components/cards";
import MetricCharts from "./_components/chart";
import DashboardHeader from "./_components/dashboard-header";
import DashboardMostView from "./_components/dashboard-mostview";

const DashboardPage = () => {
  return (
    <div className="h-full">
      <Suspense fallback={<div>Carregando cabeçalho...</div>}>
        <DashboardHeader />
      </Suspense>
      <div className="p-2 flex flex-col gap-2">
        <Suspense fallback={<div>Carregando métricas...</div>}>
          <MetricCards />
        </Suspense>
        <Suspense fallback={<div>Carregando gráficos...</div>}>
          <MetricCharts />
        </Suspense>
        <Suspense fallback={<div>Carregando produtos mais vistos...</div>}>
          <DashboardMostView />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
