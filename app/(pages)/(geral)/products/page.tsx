import List from "@/app/_components/list";
import { Suspense } from "react";

const ProductsList = () => {
  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="w-full max-w-[1150px]">
        <Suspense>
          <List />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsList;
