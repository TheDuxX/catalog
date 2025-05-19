"use client";
import { Suspense } from "react";
import DashboardList from "../../_components/dashboard-list";

const DashboardProductsPage = () => {
  return (
    <>
      <Suspense>
        <DashboardList />
      </Suspense>
    </>
  );
};

export default DashboardProductsPage;
