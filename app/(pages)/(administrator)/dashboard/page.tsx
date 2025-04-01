import MetricCards from "./_components/cards";
import DashboardHeader from "./_components/dashboard-header";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="p-4">
        <MetricCards />
      </div>
    </>
  );
};

export default DashboardPage;
