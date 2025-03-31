import MetricCharts from "./_components/charts";
import DashboardHeader from "./_components/dashboard-header";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="p-2">
        <MetricCharts />
      </div>
    </>
  );
};

export default DashboardPage;
