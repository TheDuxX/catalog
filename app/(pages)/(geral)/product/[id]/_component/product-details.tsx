"use client";
import { useEffect, useState } from "react";
import { MessageCircleQuestionIcon, Minus, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import LinksRoute from "@/app/_components/link-route";
import ResponsiveCarousel from "./responsive_carossel";
import SaleButton from "./sale-button";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Button } from "@/app/_components/ui/button";

const ProductDetailService = ({ id }: { id: string }) => {
  return <ProductDetailContent id={id} />;
};

const ProductDetailContent = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar produto");

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingProduct />;
  if (!product)
    return <p className="text-center py-4">Produto não encontrado.</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
      <div className="lg:max-w-[1140px] w-full mt-4 flex flex-col gap-4">
        <LinksRoute product={product} />
        <div className="flex flex-col lg:flex-row gap-4 bg-white shadow rounded-lg overflow-hidden p-2 mb-4">
          <div className="w-full h-auto rounded-md">
            <ResponsiveCarousel product={product} />
          </div>
          <div className="w-full flex flex-col justify-between gap-2 p-2">
            <h2 className="font-semibold text-4xl">{product.name}</h2>
            <div className="flex flex-row gap-2 lg:w-[80%] w-full justify-between items-center pb-2">
              <p>
                <strong>Marca: </strong>
                {product.mark?.name || "N/A"}
              </p>
              <p>
                <strong>Categoria: </strong>
                {product.category?.name || "N/A"}
              </p>
              <p>
                <strong>Ref: </strong>
                {product.reference}
              </p>
            </div>
            <p className="bg-transparent h-auto min-h-32 overscroll-auto ">
              {product.description}
            </p>
            <div className="w-full flex justify-between items-center gap-4">
              <div className="font-semibold text-4xl md:flex md:flex-row md:items-baseline md:gap-2 ">
                <h2>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </h2>
                <small className="text-sm font-normal text-start">
                  à vista / un.
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MessageCircleQuestionIcon
                          className="fill-primary text-white"
                          size={16}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        className="bg-white text-black shadow"
                        align="start"
                      >
                        <p>
                          O preço pode variar de acordo com a forma de pagamento
                          ou disponibilidade do produto
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </small>
              </div>
              <div className="w-1/3">
                <div className="w-full border border-secondary rounded-md flex gap-2 justify-between items-center p-2">
                  <Button
                    variant={"ghost"}
                    className="p-0 hover:bg-transparent"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <Minus />
                  </Button>
                  <p>{quantity}</p>
                  <Button
                    variant={"ghost"}
                    className="p-0 hover:bg-transparent"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
            <SaleButton product={product} quantity={quantity} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingProduct = () => (
  <div className="w-full max-w-[1150px] flex flex-col justify-center items-start py-4 gap-4">
    <Skeleton className="md:w-2/3 w-full h-5 py-2" />
    <Skeleton className="w-full md:h-[460px] h-svh py-2" />
  </div>
);

export default ProductDetailService;
