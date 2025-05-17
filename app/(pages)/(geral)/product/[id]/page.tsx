import ProductDetailService from "./_component/product-details";

export default function ProductDetailPage({ params }: any) {
  return (
    <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
      <ProductDetailService id={params.id} />
    </div>
  );
}
