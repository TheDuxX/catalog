import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";

interface ProductProps {
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
    }
}

const LinksRoute = ({product} : ProductProps) => {
  return (
    <>
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
    </>
  );
};

export default LinksRoute;
