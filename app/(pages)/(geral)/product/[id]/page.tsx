import ProductDetailService from "./_component/product-details";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
      {id ? (
        <ProductDetailService id={id as string} />
      ) : (
        "Produto não encontrado"
      )}
    </div>
  );
}
