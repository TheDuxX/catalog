import ProductListView from "./_views/product-list-view";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ProductListView searchQuery="" />
    </div>
  );
};

export default DashboardPage;
