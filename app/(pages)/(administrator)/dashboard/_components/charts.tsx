"use client";
import {
  ArrowDown,
  ArrowUp,
  BadgeDollarSign,
  BoxIcon,
  Eye,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useActivitycharts } from "../_viewmodels/useActivityCharts";

const MetricCharts = () => {
  const {
    totalViews,
    totalOrders,
    totalProducts,
    viewsChange,
    ordersChange,
    loading,
  } = useActivitycharts();

  if (loading) return <div>Carregando...</div>;

  const formatChange = (value: number | null) => {
    if (value === null) return "N/A";
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="flex w-full flex-row gap-4">
      <div className="w-full max-w-[300px] bg-white rounded-md shadow p-4 space-y-2">
        <div className={`flex flex-row items-center gap-2 `}>
          <Eye size={20} className="stroke-1" />
          <h3 className="text-lg font-medium">Visitas</h3>
        </div>
        <div className="flex flex-row gap-2 w-full justify-between items-baseline">
          <p className="text-4xl font-bold">{totalViews.toLocaleString()}</p>
          <div
            className={`flex  items-center ${
              viewsChange! > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {viewsChange! > 0 ? (
              <div className="flex flex=row gap-1">
                <TrendingUp size={16} />
                <p>+</p>
              </div>
            ) : (
              <div className="flex flex=row gap-1">
                <TrendingDown size={16} />
                <p>-</p>
              </div>
            )}
            {formatChange(viewsChange)}
          </div>
        </div>
        {/* <span className="text-gray-500 text-sm">Visualizações de página</span> */}
      </div>
      <div className="w-full max-w-[300px] bg-white rounded-md shadow p-4 space-y-2">
        <div className="flex flex-row items-center gap-2">
          <BadgeDollarSign size={20} className="stroke-1" />
          <h3 className="text-lg font-medium">Pedidos</h3>
        </div>
        <div className="flex flex-row gap-2 w-full justify-between items-baseline">
          <p className="text-4xl font-bold">{totalOrders.toLocaleString()}</p>
          <div
            className={`flex items-center ${
              ordersChange! > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {ordersChange! > 0 ? (
              <div className="flex flex=row gap-1">
                <TrendingUp size={16} />
                <p>+</p>
              </div>
            ) : (
              <div className="flex flex=row gap-1">
                <TrendingDown size={16} />
                <p>-</p>
              </div>
            )}
            {formatChange(ordersChange)}
          </div>
        </div>
        {/* <span className="text-gray-500 text-sm">Pedidos realizados</span> */}
      </div>
      <div className="w-full max-w-[300px] bg-white rounded-md shadow p-4 space-y-2">
        <div className="flex flex-row items-center gap-2">
          <BoxIcon size={20} className="stroke-1" />
          <h3 className="text-lg font-medium">Produtos</h3>
        </div>
        <p className="text-4xl font-bold">{totalProducts}</p>
        {/* <span className="text-gray-500 text-sm">Total de produtos cadastrados</span> */}
      </div>
    </div>
  );
};

export default MetricCharts;
