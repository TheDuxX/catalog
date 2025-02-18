import toast from "react-hot-toast";
import { createClient } from "../_utils/supabase/server";
import Item from "./_component/item";
import ResponsiveCarousel from "./_component/responsive_carossel";

const Home = async () => {
  const supabase = await createClient();

  let { data: products, error } = await supabase
    .from("product")
    .select("*, category:categoryId(name), mark:markId(name)");

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    toast.error("Erro ao buscar produtos.");
  }

  // Converta price de Decimal para number
  const convertedProducts = products!.map((product) => ({
    ...product,
    price: parseFloat(product.price.toFixed(2)), // Converte Decimal para number
  }));

  const mostViewsProducts = [...products!].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  );

  const recentProducts = [...products!].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="flex flex-col gap-2 justify-center items-center">
      <div className="space-y-4 w-full p-2 lg:max-w-[1150px]">
        <ResponsiveCarousel />
      </div>
      <div className="relative w-full max-w-[1150px] ">
        <h2 className="font-semibold text-lg px-2">Mais Vistos</h2>
        <div className="flex gap-2 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2 pr-0">
          {mostViewsProducts.slice(0, 5).map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="relative w-full max-w-[1150px]">
        <h2 className="font-semibold text-lg px-2">Adiconados Recentemente</h2>
        <div className="flex gap-2 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2 pr-0">
          {recentProducts.slice(0, 5).map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
