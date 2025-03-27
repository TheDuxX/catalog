import ProductList from "@/app/_components/list";

const ProductsList = () => {
  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="w-full max-w-[1150px]">
        <ProductList />
      </div>
    </div>
  ); 
};

export default ProductsList;
