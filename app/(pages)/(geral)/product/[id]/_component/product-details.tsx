"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircleQuestionIcon,
  Minus,
  Plus,
} from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/app/(pages)/(administrator)/dashboard/_services/product-service";
import { useParams } from "next/navigation";
import { Separator } from "@/app/_components/ui/separator";

const ProductDetailService = () => {
  const params = useParams();
  const id = params?.id;

  return <ProductDetailContent id={id as string} />;
};

const ProductDetailContent = ({ id }: { id: string }) => {
  const [expand, setExpand] = useState(false);

  const { data: product, isLoading: loading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

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
          <div className="w-full flex flex-col gap-2 p-2">
            <h2 className="font-semibold text-4xl">{product.name}</h2>
            <div className="flex flex-col gap-1 lg:w-[80%] w-full items-start pb-2">
              <p>
                <strong>Marca: </strong>
                {product.mark?.name}
              </p>
              <p>
                <strong>Categoria: </strong>
                {product.category?.name}
              </p>
              <p>
                <strong>Ref: </strong>
                {product.reference}
              </p>
            </div>
            <Separator className="bg-secondary" />
            <div className="w-full flex justify-between items-center gap-4">
              <div className="font-semibold text-4xl flex flex-row items-center gap-4 ">
                <h2>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </h2>
                <small className="text-sm font-normal text-start line-clamp-2 text-pretty">
                  ou em até 6x de{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price / 6)}
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
            </div>
            <SaleButton product={product} />
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex flex-row items-center justify-between">
                <h2 className="font-semibold text-lg">Descrição</h2>
                {/* adicionar condicional para exibir o botão, se o texto for muito longo */}
                {product.description.length > 300 ? (
                  <Button
                    variant="button"
                    size="sm"
                    onClick={() => setExpand(!expand)}
                  >
                    {expand ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                ) : (
                  <></>
                )}
              </div>
              <Separator className="bg-secondary" />
              <p
                className={`bg-transparent h-auto min-h-16 overscroll-auto text-justify ${
                  expand ? "line-clamp-none" : "line-clamp-5"
                }`}
              >
                {product.description}
              </p>
            </div>
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
