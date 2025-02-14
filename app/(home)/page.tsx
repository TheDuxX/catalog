import toast from "react-hot-toast";
import ProductList from "../_components/list";
import { createClient } from "../_utils/supabase/server";
import Header from "../_components/header";
import SlideBanner from "./_component/slide-banner";
import Search from "../_components/search";
import BrandTags from "./_component/tags";
import MostViews from "./_component/most-views";
import Item from "./_component/item";

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
        <SlideBanner />
        {/* <BrandTags /> */}
      </div>
      <div className="relative w-full max-w-[1154px]">
        <h2 className="font-semibold text-lg px-2">Mais Vistos</h2>
        <div className="flex gap-2 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2">
          {mostViewsProducts.slice(0, 5).map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="relative w-full max-w-[1154px]">
        <h2 className="font-semibold text-lg px-2">Adiconados Recentemente</h2>
        <div className="flex gap-2 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2">
          {recentProducts.slice(0, 5).map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
