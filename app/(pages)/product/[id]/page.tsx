import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import { FindUniqueProduct } from "@/app/_lib/utils";
import { MessageCircleQuestionIcon, Minus, Plus } from "lucide-react";
import ResponsiveCarousel from "./_component/responsive_carossel";
import SaleButton from "./_component/sale-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import LinksRoute from "@/app/_components/link-route";

interface ProdctDetailsPageProps {
  params: {
    id?: string;
  };
}

const ProductDetailPage = async ({ params }: ProdctDetailsPageProps) => {
  const { id } = await params;


  if (!id) {
    return <div>Produto não encontrado</div>;
  }

  const product = await FindUniqueProduct(id); // Chame a função passando o ID do produto

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center px-2 lg:px-0">
        <div className="lg:max-w-[1140px] w-full mt-4 flex flex-col gap-4">
          <LinksRoute product={product} />
          <div
            className={`flex flex-col lg:flex-row gap-4 bg-white shadow rounded-lg overflow-hidden p-2 `}
          >
            <div className="w-full h-auto rounded-md">
              <ResponsiveCarousel product={product} />
            </div>
            <div className="w-full flex flex-col gap-2 p-2">
              <h2 className="font-semibold text-4xl">{product.name}</h2>
              <div className="flex flex-row gap-2 lg:w-[80%] w-full justify-between items-center pb-2">
                <p><strong>Marca: </strong>{product.mark.name}</p>
                <p><strong>Categoria: </strong>{product.category.name}</p>
                <p><strong>Ref: </strong>{product.reference}</p>
              </div>
              <p className="bg-transparent h-auto min-h-32 overscroll-auto">{product.description}</p>
              <div className="w-full  flex flex-col gap-4">
                <h2 className="font-semibold text-4xl">
                  {formattedPrice}
                  <small className="text-sm font-normal">
                    {" "}
                    à vista / un.
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="">
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
                            O preço pode variar de acordo com a forma de
                            pagamento ou disponibilidade do produto
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </small>
                </h2>
                <div>
                  <p>Selecione a quantidade desejada.</p>
                  <div className="w-full border border-secondary rounded-md flex gap-2 justify-between items-center p-2">
                    <Plus className="opacity-50" />
                    <p>1</p>
                    <Minus className="opacity-50" />
                  </div>
                </div>
                <SaleButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
