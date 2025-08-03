import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToCartButton } from "./AddToCartButton";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="aspect-square relative w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="coffee bag"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/product/${product.slug}`}>
          <CardTitle className="text-lg font-bold font-headline hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="mt-2 text-xl font-semibold text-primary">
          {product.price.toLocaleString('fr-FR')} FCFA
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
