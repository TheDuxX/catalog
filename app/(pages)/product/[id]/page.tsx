import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { FindUniqueProduct } from "@/app/_lib/utils";
import { Minus, Plus } from "lucide-react";
import ResponsiveCarousel from "./_component/responsive_carossel";

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

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="lg:max-w-[1140px] w-full mt-4 flex flex-col gap-4">
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Peças</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">
                  {product.mark.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">
                  {product.category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/product/${product.id}`}>
                  {product.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row gap-4 bg-white shadow rounded-lg overflow-hidden p-2">
            <div className="w-full h-auto rounded-md">
              <ResponsiveCarousel product={product} />
            </div>
            <div className="w-full flex flex-col gap-4 ">
              <div>
                <h2 className="font-semibold text-4xl">{product.name}</h2>
                <small>Ref:{product.reference}</small>
                <p>Marca:{product.mark.name}</p>
                <p>Categoria:{product.category.name}</p>
                <p>{product.description}</p>
              </div>
              <div className="w-full p-4 flex flex-col gap-4">
                <h2 className="font-semibold text-2xl">
                  R$ {product.price}{" "}
                  <small className="text-sm font-normal">à vista / un.</small>
                </h2>
                <div>
                  <p>Selecione a quantidade desejada.</p>
                  <div className="w-full border border-secondary rounded-md flex gap-2 justify-between items-center p-2">
                    <Plus className="opacity-50" />
                    <p>1</p>
                    <Minus className="opacity-50" />
                  </div>
                </div>
                <Button className="" variant="secondary">
                  <p className="">Fazer pedido</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
