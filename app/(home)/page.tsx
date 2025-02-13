import toast from "react-hot-toast";
import ProductList from "../_components/list";
import { createClient } from "../_utils/supabase/server";
import Header from "./_component/header";
import SlideBanner from "./_component/slide-banner";
import Search from "../_components/search";
import BrandTags from "./_component/tags";

const Home = async () => {
  const supabase = await createClient();

  let { data: products, error } = await supabase.from("product").select("*");

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    toast.error("Erro ao buscar produtos.");
  }

  // Converta price de Decimal para number
  const convertedProducts = products!.map((product) => ({
    ...product,
    price: parseFloat(product.price.toFixed(2)), // Converte Decimal para number
  }));
  return (
    <main className="flex flex-col gap-2 justify-center items-center">
      <Header />

      <div className="space-y-4 p-2 lg:max-w-[1150px]">
        <SlideBanner />
        <BrandTags />
        {/* <Search /> */}
        <ProductList product={convertedProducts} />
      </div>
    </main>
  );
};

export default Home;
