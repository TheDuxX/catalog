import ProductList from "@/app/_components/list";
import { createClient } from "@/app/_utils/supabase/server";

const ProductsList = async () => {
  const supabase = await createClient(); // 🔥 Removido o await

  let { data: products, error } = await supabase.from("product").select(
    `id, name, description, reference, status, price, date, "imageUrls", views, 
    category:categoryId(name), 
    mark:markId(name)`
  );

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return <p>Erro ao carregar produtos.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="w-full max-w-[1150px]">
        <ProductList product={products || []} />
      </div>
    </div>
  ); // 🔥 Garantido que products sempre seja um array
};

export default ProductsList;
