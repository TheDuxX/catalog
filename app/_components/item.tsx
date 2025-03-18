"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { createSupabaseClient } from "../_utils/supabase/client";
import SaleButton from "../(pages)/product/[id]/_component/sale-button";

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
  itemOrientation: boolean;
}

const Item = ({ product, itemOrientation }: ProductItemProps) => {
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

  const formattedPrice = `R$ ${product.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Card
      className={`p-0 ${
        itemOrientation ? "w-full" : "md:w-50% lg:w-50%"
      } bg-white`}
      onClick={handleProductClick}
    >
      <CardContent
        className={`p-2 flex ${
          itemOrientation ? "flex-row " : "flex-col justify-between"
        } `}
      >
        <div className={`relative min-w-[120px] aspect-square rounded-md`}>
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={true} // {false} | {true}
          />
        </div>
        <div
          className={` flex flex-col  ${
            itemOrientation ? "gap-5 justify-between px-5" : "gap-2 px-2"
          }`}
        >
          <div className="flex flex-col gap-0">
            <h2
              className={`font-medium line-clamp-1 ${
                itemOrientation ? "text-xl" : "text-lg"
              }`}
            >
              {product.name}
            </h2>

            {itemOrientation ? (
              <small>{product.description}</small>
            ) : (
              <small className="text-secondary">
                {product.mark ? product.mark.name : "Marca não disponível"}
              </small>
            )}
          </div>
          <h3
            className={`scroll-m-20 ${
              itemOrientation ? "text-2xl" : "text-2xl"
            } font-semibold tracking-tight`}
          >
            {formattedPrice}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default Item;
