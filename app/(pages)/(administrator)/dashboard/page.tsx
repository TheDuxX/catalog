import MetricCards from "./_components/cards";
import MetricCharts from "./_components/chart";
import DashboardHeader from "./_components/dashboard-header";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="p-4 flex flex-col gap-4">
        <MetricCards />
        <MetricCharts />
      </div>
    </>
  );
};

export default DashboardPage;
