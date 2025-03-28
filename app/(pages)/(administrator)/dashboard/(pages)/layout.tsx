import DashboardHeader from "../_components/dashboard-header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col">
        <DashboardHeader />
        <div className="p-2">{children}</div>
      </div>
    </>
  );
}
