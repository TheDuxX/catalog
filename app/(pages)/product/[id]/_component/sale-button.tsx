"use client";
import { Button } from "@/app/_components/ui/button";
import { usePathname } from "next/navigation";

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
  };
}

const SaleButton = ({ product }: ProductProps) => {
  const pathname = usePathname();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  // Formata o preço corretamente para Real (BRL)
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  const message = encodeURIComponent(
    `Olá, tenho interesse no produto: ${product.name}, ${product.mark.name} ${formattedPrice}. Confira aqui: ${siteUrl}${pathname}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=+5542999114876&text=${message}`;

  return (
    <Button variant="secondary" className="text-lg font-semibold p-6" onClick={() => window.open(whatsappUrl, "_blank")}>
      Enviar pedido
    </Button>
  );
};

export default SaleButton;
