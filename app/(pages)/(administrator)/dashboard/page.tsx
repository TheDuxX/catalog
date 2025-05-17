"use client";
import MetricCards from "./_components/cards";
import MetricCharts from "./_components/chart";
import DashboardHeader from "./_components/dashboard-header";
import DashboardMostView from "./_components/dashboard-mostview";

const DashboardPage = () => {
  return (
    <div className="h-full ">
      <DashboardHeader />
      <div className="p-2 flex flex-col gap-2">
        <MetricCards />
        <MetricCharts />
        <DashboardMostView />
      </div>
    </div>
  );
};

export default DashboardPage;
