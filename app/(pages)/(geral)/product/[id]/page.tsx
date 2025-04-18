import { Suspense } from "react";
import ProductDetailService from "./_component/product-details";

interface ProdctDetailsPageProps {
  params: {
    id?: string;
  };
}

const ProductDetailPage = async ({ params }: ProdctDetailsPageProps) => {
  const { id } = await params;

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
        <ProductDetailService id={id!} />
      </div>
    </>
  );
};

export default ProductDetailPage;
