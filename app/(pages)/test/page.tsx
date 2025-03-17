import { createClient } from "@/app/_utils/supabase/server";
import ProductList from "./_components/list";
import ProductTest from "./_components/products";

const Test = async () => {

  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="w-full max-w-[1150px]">
        <ProductList />
      </div>
    </div>
  );
};

export default Test;
