import DashboardHeader from "./_components/dashboard-header";
import ProductListView from "./_views/product-list-view";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="p-2">
        <ProductListView searchQuery="" />
      </div>
    </>
  );
};

export default DashboardPage;
