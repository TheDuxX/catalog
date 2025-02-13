"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card";
import { createSupabaseClient } from "@/app/_utils/supabase/client";

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    description: string;
    reference: string;
    status: boolean;
    date: Date;
    price: number;
    categoryId: string;
    markId: string;
    imageUrls: string[];
    views: number | null;
    category: {
      id: string;
      name: string;
    };
    mark: {
      id: string;
      name: string;
    };
  };
}

const Item = ({ product }: ProductItemProps) => {
  const router = useRouter();

  const handleProductClick = async () => {
    try {
      // Atualiza o status do produto com o ID fornecido
      const supabase = createSupabaseClient();
      const { data, error } = await supabase.rpc("increment_column", {
        row_id: product.id,
        increment_by: 1, // Valor a incrementar
      });

      if (error) {
        console.error("Erro ao atualizar o status do produto:", error);
      } else {
        router.push(`/product/${product.id}`);
      }
    } catch (error) {
      console.error("Erro interno ao atualizar o status do produto:", error);
    }
  };

  const formattedPrice = `R$ ${(
    product.price as unknown as number
  ).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Card className="p-0 min-w-[180px] lg:min-w-[240px] bg-white" onClick={handleProductClick}>
      <CardContent className={`p-1 flex flex-col justify-between`}>
        <div
          className={`relative min-w-[150px] aspect-square rounded-md`}
        >
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={` flex flex-col  gap-2 px-2`}>
          <div className="flex flex-col gap-0">
            <h2 className={`font-medium line-clamp-1 text-lg`}>
              {product.name}
            </h2>
            <small>
              {product.mark ? product.mark.name : "Marca não disponível"}
            </small>
          </div>
          <h3 className={`scroll-m-20 text-lg font-semibold tracking-tight`}>
            {formattedPrice}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default Item;
