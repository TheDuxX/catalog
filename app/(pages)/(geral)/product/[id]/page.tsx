import ProductDetailService from "./_component/product-details";

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
}

const ProductDetailPage = ({ params }: PageProps) => {
  const { id } = params;

  return (
    <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
      <ProductDetailService id={id} />
    </div>
  );
};

export default ProductDetailPage;
