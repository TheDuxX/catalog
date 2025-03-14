"use client";

import { useEffect, useState } from "react";

const ProductTest = () => {
  const [Products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  console.log(Products);
  return <> </>;
};

export default ProductTest;
