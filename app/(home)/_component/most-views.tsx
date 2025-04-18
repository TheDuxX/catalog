"use client"
import Item from "./item";
import { useEffect, useState } from "react";

const MostViews = () => {
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

  // Ordena os produtos pelos mais vistos
  const sortedProducts = [...products!].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  );

  return (
    <>
      <h2 className="font-semibold text-lg px-2">Mais vistos</h2>
      <div className="rounded-md flex gap-2 lg:max-w-[1150px] overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2">
        {sortedProducts.slice(0, 5).map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default MostViews;
