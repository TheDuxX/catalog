"use client"
import { useEffect, useState } from "react";
import Item from "./item";

const RecentProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const recentProducts = [...products!].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <h2 className="font-semibold text-lg px-2">Mais vistos</h2>
      <div className="rounded-md flex gap-2 lg:max-w-[1150px] overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2">
        {recentProducts.slice(0, 5).map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default RecentProducts;
