import ProductDetailService from "./_component/product-details";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailsPageProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
      <ProductDetailService id={params.id} />
    </div>
  );
}
