import ProductDetailService from "./_component/product-details";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailsPageProps) => {
  const { id } = params;

  return (
    <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
      <ProductDetailService id={id} />
    </div>
  );
};

export default ProductDetailPage;