import { fetchProducts } from "@/app/(pages)/(administrator)/dashboard/_services/products-service";
import { useQuery } from "@tanstack/react-query";

export const useHome = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  //ordenar produtos por views
  const sortedProducts = products
    ? [...products!].sort((a, b) => b.views - a.views)
    : [];

  //ordenar pordutos por data de criação
  const recentProducts = products
    ? [...products!].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  const formattedPrice = (price: number) =>
    `R$ ${price.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return {
    sortedProducts,
    recentProducts,
    formattedPrice,
    products,
    isLoading,
    isError,
    error,
    refetch,
  };
};
