import { createClient } from "@/app/_utils/supabase/server";
import Item from "./item";

const MostViews = async () => {
  const supabase = await createClient();

  // Consulta os produtos com suas relações
  let { data: products, error } = await supabase
    .from("product")
    .select(
      `id, name, description, reference, status, price, date, "imageUrls", views, 
      category:categoryId(name), 
      mark:markId(name)`
    )
    .order("views", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    return <p>Erro ao carregar os produtos.</p>;
  }

  // Ordena os produtos pelos mais vistos
  const sortedProducts = [...products!].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  );

  return (
    <>
      <h2 className="font-semibold text-lg">Mais vistos</h2>
      <div className="rounded-md flex gap-2 lg:max-w-[1150px] overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden p-2">
        {sortedProducts.slice(0, 5).map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default MostViews;
