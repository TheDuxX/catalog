"use client";
import { useProductListViewModel } from "../_viewmodels/product-list-view-model";

const ProductListView = ({ searchQuery }) => {
  const { products, loading } = useProductListViewModel(searchQuery);

  if (loading) return <p>Carregando...</p>;
  if (!products.length) return <p>Nenhum produto encontrado.</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductListView;